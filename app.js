const express = require("express");
const bodyParser = require("body-parser");
const translations = require("./translations");
const apifunctions = require("./apifunctions");
const db = require("./db");
const { exec } = require('child_process');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = process.env.PORT || 80;


// Set EJS as view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));

/*
? {
?   "id": string,
?   "expires": timestamp,
?   "data": {
?     "login": str,
?     "name": str,
?     "campus": int,
?     "campus_full": str,
?     "language": str,
?     "cursus_active": bool
?   }
? }
*/
const current_registration_sessions = [];



const ranking = [];
const all_logins = [];
const all_streaks = [];
const all_points = [];
const all_indexes = [];
const all_campuses = []
var curr_index = 0;
const all_days = []
var current_day = 0;
const all_days_scores = []


function read_ranking() {
  ranking.splice(0);
  all_logins.splice(0);
  all_streaks.splice(0);
  all_points.splice(0);
  all_indexes.splice(0);
  all_campuses.splice(0);
  all_days.splice(0);
  all_days_scores.splice(0);
  curr_index = 0;
  current_day = 0;
  fs.createReadStream('private/ranking.csv')
    .pipe(csv())
    .on('headers', (headers) => {
      column_names = headers;
    })
    .on('data', (row) => {
      if (current_day == 0) {
        current_day = column_names.length - 8;
        for (const x of Array(current_day).keys()) {
          all_days.push(x + 1);
          all_days_scores.push([])
        }
      }
      ranking.push(row)
      if (row['login'].length > 11) {
        all_logins.push(row['login'].substring(0, 10) + ".");
      }
      else {
        all_logins.push(row['login']);
      }
      all_streaks.push(row['streak']);
      all_campuses.push(row['campus']);
      all_points.push(Math.round(row['points'] * 10) / 10);
      all_indexes.push(curr_index);
      curr_index += 1;
      for (const day of all_days) {
        var cellresults = JSON.parse(row[day.toString()])
        all_days_scores[day - 1].push([cellresults[0]['status'], cellresults[1]['status']]);
      }
  
    })
    .on('end', () => {
      console.log('Ranking read successfully');
    });
}



async function initial_scripts() {
  await get_accounts();
  updateRanking();
}

const account_ids = [];
const account_logins = [];
const account_campus = [];

async function get_accounts()  {
  try {
    const users = await db.get_all_users();
    let newfile = "id,login,campus\n";
    for (let i = 0; i < users.length; i++) {
      newfile = newfile.concat(`${users[i]["id"]},${users[i]["login"]},${users[i]["campus"]}\n`);
      account_ids.push(users[i]["id"]);
      account_logins.push(users[i]["login"]);
      account_campus.push(users[i]["campus"]);
    }
    fs.writeFileSync("private/userids.csv", newfile);
    console.log('User list:', users);
  } catch (err) {
    console.error('Failed to retrieve user list:', err);
  }
}


function updateRanking() {
  console.log("> Running Python script...")
  // exec('python3 python_scripts/update_ranking.py', (error, stdout, stderr) => {
  exec('python python_scripts/update_ranking.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error (executing Python but not the program's fault): ${error}`);
      return;
    }
    if (stderr) {
      console.error(`Python error: ${stderr}`);
    }
    console.log("> Python script done :)")
    read_ranking();
  });
}

setInterval(updateRanking, parseInt(process.env.PYTHON_UPDATE_FREQUENCY_MS));

initial_scripts();

function generateId(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
  

function removeExpiredSessions() {
  let thetime = Date.now();
  while (current_registration_sessions.length > 0) {
    if (current_registration_sessions[0]["expires"] < thetime) {
      current_registration_sessions.shift();
    }
    else {
      break ;
    }
  }
}

setInterval(removeExpiredSessions, parseInt(process.env.SESSION_EXPIRATION_REMOVAL_FREQUENCY_MS));

// Routes
app.get("/", (req, res) => {
  return res.redirect("/es");
});

app.get("/:lang([a-z]{2})", (req, res) => {
  const lang = req.params.lang;
  var langkit;
  if (lang.localeCompare("ca") == 0) {
    langkit = translations.index_ca;
  }
  else if (lang.localeCompare("en") == 0) {
    langkit = translations.index_en;
  }
  else {
    langkit = translations.index_es;
  }
  res.render("index", { langkit: langkit });
});

app.get('/auth', (req, res) => {
  const authUrl = process.env.AUTH_URL; // Use the auto generated token by the API.
  res.redirect(authUrl);
});


app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const token = await apifunctions.exchangeCodeForToken(code);
    const userInfo = await apifunctions.getUserInfo(token);
    const usefulInfo = {}
    var qualifies = 0;
    
    usefulInfo['login'] = userInfo["login"] //? Getting login
    usefulInfo['name'] = userInfo["first_name"] //? Getting name
    for (let i = 0; i < userInfo["campus_users"].length; i++) { //?   Getting campus
      if (userInfo["campus_users"][i]["is_primary"] == true) {  //*   22: Madrid | 37: Málaga | 40: Urduliz | 46: Barcelona
        usefulInfo['campus'] = userInfo["campus_users"][i]["campus_id"];
        switch (userInfo["campus_users"][i]["campus_id"]) {
          case 22:
            usefulInfo['campus_full'] = "Madrid";
            break;
          case 37:
            usefulInfo['campus_full'] = "Málaga";
            break;
          case 40:
            usefulInfo['campus_full'] = "Urduliz";
            break;
          case 46:
            usefulInfo['campus_full'] = "Barcelona";
            break;
          default:
            qualifies = -1;
            usefulInfo['campus'] = "NONE";
            usefulInfo['campus_full'] = "campus_id = ".concat((userInfo["campus_users"][i]["campus_id"]).toString());
        }
      }
    }
    
    usefulInfo['language'] = "es";
    for (let i = 0; i < userInfo["languages_users"].length; i++) { //?   Getting language
      switch (userInfo["languages_users"][i]["language_id"]) {
        case 11:
          usefulInfo['language'] = "es";
          i = 500;
          break;
        case 2:
          usefulInfo['language'] = "en";
          i = 500;
          break;
        case 19:
          usefulInfo['language'] = "ca";
          i = 500;
          break;
        }
      }
    usefulInfo['cursus_active'] = false;
    for (let i = 0; i < userInfo["cursus_users"].length; i++) { //?   Getting cursus (id = 21 || id = 53)
      if (userInfo["cursus_users"][i]["cursus_id"] == 21 || userInfo["cursus_users"][i]["cursus_id"] == 53) {
        usefulInfo['cursus_active'] = true;
        if (qualifies == 0) { qualifies = 1; }
        }
      }
    registration_session = { "id": generateId(8), "expires": Date.now() + parseInt(process.env.REGISTER_SESSION_EXPIRATION_MS), "data": usefulInfo };
    current_registration_sessions.push(registration_session);
    var qualifies_class = [];
    if (qualifies == 1) {
      qualifies_class.push("visibility:visible;");
      qualifies_class.push("visibility:hidden;display:none;");
    } else {
      qualifies_class.push("visibility:hidden;display:none;");
      qualifies_class.push("visibility:visible;");
    }
    
    var login_exists = false;
    var login_exists_id = "";
    for (let idx = 0; idx < account_logins.length; idx++) {
      if (account_logins[idx].localeCompare(usefulInfo['login']) == 0) {
        login_exists = true;
        login_exists_id = account_ids[idx];
      }
    }
    
    if (login_exists == false) {
      switch(usefulInfo['language']) {
        case "en":
          res.render("newuser", { info: registration_session, langkit: translations.newuser_en, qualifies: qualifies_class })
          break;
        case "ca":
          res.render("newuser", { info: registration_session, langkit: translations.newuser_ca, qualifies: qualifies_class })
          break;
        default:
          res.render("newuser", { info: registration_session, langkit: translations.newuser_es, qualifies: qualifies_class })
          break;
      }
    }
    else {
      switch(usefulInfo['language']) {
        case "en":
          res.render("edituser", { info: registration_session, current_group: process.env.CURRENT_AOC_GROUP, langkit: translations.edituser_en, current_aocid: login_exists_id })
          break;
        case "ca":
          res.render("edituser", { info: registration_session, current_group: process.env.CURRENT_AOC_GROUP, langkit: translations.edituser_ca, current_aocid: login_exists_id })
          break;
        default:
          res.render("edituser", { info: registration_session, current_group: process.env.CURRENT_AOC_GROUP, langkit: translations.edituser_es, current_aocid: login_exists_id })
          break;
      }
    }
  } catch (error) {
    res.status(500).send(`Authentication failed :( ${error}`);
  }
});



app.get("/register/:lang([a-z]{2})", (req, res) => {
  const lang = req.params.lang;
  var langkit;
  if (lang.localeCompare("ca") == 0) {
    langkit = translations.register_ca;
  }
  else if (lang.localeCompare("en") == 0) {
    langkit = translations.register_en;
  }
  else {
    langkit = translations.register_es;
  }
	res.render("register", { langkit: langkit });
});


app.get("/register", (req, res) => {
	return res.redirect("/register/es");
});


app.get("/ranking/:lang([a-z]{2})", (req, res) => {
  const lang = req.params.lang;
  var langkit;
  if (lang.localeCompare("ca") == 0) {
    langkit = translations.ranking_ca;
  }
  else if (lang.localeCompare("en") == 0) {
    langkit = translations.ranking_en;
  }
  else {
    langkit = translations.ranking_es;
  }
  let ranking_visible_class = [];
  if (all_logins.length == 0) {
    ranking_visible_class.push("visibility:hidden;display:none;");
    ranking_visible_class.push("visibility:visible;");
  } else {
    ranking_visible_class.push("visibility:visible;");
    ranking_visible_class.push("visibility:hidden;display:none;");
  }
  const colored_logins = [];

  for (let i = 0; i < all_logins.length; i++) {
    if (all_logins[i].includes(process.env.SPECIAL_LOGINS.split(" "))) {
      colored_logins.push(`<span style=\"color: yellow\">${all_logins[i]}</span>`);
    } else {
      colored_logins.push(all_logins[i]);
    }
  }


	res.render("ranking", { all_logins: colored_logins, all_streaks: all_streaks, all_points: all_points, all_campuses: all_campuses, all_indexes: all_indexes, all_days_scores: all_days_scores, all_days: all_days, current_day: current_day, ranking_visible_class: ranking_visible_class, langkit: langkit });
});

app.get("/ranking", (req, res) => {
  return res.redirect("/ranking/es");
});


app.get("/faqs/:lang([a-z]{2})", (req, res) => {
  const lang = req.params.lang;
  var langkit;
  if (lang.localeCompare("ca") == 0) {
    langkit = translations.faqs_ca;
  }
  else if (lang.localeCompare("en") == 0) {
    langkit = translations.faqs_en;
  }
  else {
    langkit = translations.faqs_es;
  }
	res.render("faqs", { langkit: langkit });
});

app.get("/faqs", (req, res) => {
  return res.redirect("/faqs/es");
});

app.get("/paypal", (req, res) => {
  return res.redirect("https://www.youtube.com/watch?v=QB7ACr7pUuE");
});

app.post("/send_registration", (req, res) => {
	const new_aocid = req.body.aocid;
  const sessionid = req.body.sessionid;
  const new_login = req.body.login;
  var   verified = false;
  var   userinfo = {}
  for (let i = 0; i < current_registration_sessions.length; i++) {
    if (current_registration_sessions[i]["id"].localeCompare(sessionid) == 0 && current_registration_sessions[i]["data"]["login"].localeCompare(new_login) == 0) {
      verified = true;
      userinfo = current_registration_sessions[i]["data"];
      break;
    }
  }
	if (verified && new_aocid && /#[1-9][0-9]{0,7}/.test(new_aocid)) {
    account_logins.push(new_login);
    account_ids.push(new_aocid.match(/[1-9][0-9]{0,7}/)[0]);
    account_campus.push(userinfo["campus"]);
    const data2append = `${new_aocid.match(/[1-9][0-9]{0,7}/)[0]},${new_login},${userinfo["campus"]}\n`;
    db.add_user(new_aocid.match(/[1-9][0-9]{0,7}/)[0], new_login, userinfo["campus"]);
    fs.appendFileSync("private/userids.csv", data2append);
	  console.log(`New user: Login: ${userinfo["login"]}  |  Campus: ${userinfo["campus_full"]}  |  ID: ${new_aocid}`);
    if (req.body.lang.localeCompare("ca") == 0) {
      res.render("registerok", {login: new_login, aocid: new_aocid, current_group: process.env.CURRENT_AOC_GROUP, langkit: translations.registerok_ca});

    }
    else if (req.body.lang.localeCompare("en") == 0) {
      res.render("registerok", {login: new_login, aocid: new_aocid, current_group: process.env.CURRENT_AOC_GROUP, langkit: translations.registerok_en});

    }
    else {
      res.render("registerok", {login: new_login, aocid: new_aocid, current_group: process.env.CURRENT_AOC_GROUP, langkit: translations.registerok_es});

    }
	}
});


app.post("/deletion", (req, res) => {
  const sessionid = req.body.sessionid;

  var   verified = false;
  var   userinfo = {}
  for (let i = 0; i < current_registration_sessions.length; i++) {
    if (current_registration_sessions[i]["id"].localeCompare(sessionid) == 0) {
      verified = true;
      userinfo = current_registration_sessions[i]["data"];
      break;
    }
  }
  if (verified == true) {
    for (let i = 0; i < account_logins.length; i++) {
      if (userinfo["login"].localeCompare(account_logins[i]) == 0) {
        account_logins.splice(i, 1);
        account_ids.splice(i, 1);
        account_campus.splice(i, 1);
        let newfile = "id,login,campus\n";

        for (let idx = 0; idx < account_logins.length; idx++) {
          newfile = newfile.concat(`${account_ids[idx]},${account_logins[idx]},${account_campus[idx]}\n`);
        }
        db.delete_user(userinfo["login"]);
        fs.writeFileSync("private/userids.csv", newfile);
        console.log(`Deleted user: Login: ${userinfo["login"]}`);
        if (req.body.lang.localeCompare("ca") == 0) {
          res.render("deleteok", {langkit: translations.deleteok_ca});
      
        }
        else if (req.body.lang.localeCompare("en") == 0) {
          res.render("deleteok", {langkit: translations.deleteok_en});
      
        }
        else {
          res.render("deleteok", {langkit: translations.deleteok_es});
      
        }
  
        break;
      }
    }

  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke from the server's side. Try again in a minute and if the problem persists, please contact @jvacaris on Slack.");
});

app.use(function(req,res,next){ 
  res.status(404).render('error', {error_n: 404, langkit: translations.deleteok_es}); 
}); 

app.listen(port, () => {
  console.log(`Server is running at ${process.env.CURRENT_URL}:${port}`);
});
