const header_en = {
	register: "Register",
	register_href: "/register/en",
	ranking: "Ranking",
	ranking_href: "/ranking/en",
	faqs: "FAQs",
	faqs_href: "/faqs/en",
	languages: "Languages"
}

const header_es = {
	register: "Registrarse",
	register_href: "/register/es",
	ranking: "Ranking",
	ranking_href: "/ranking/es",
	faqs: "FAQs",
	faqs_href: "/faqs/es",
	languages: "Idiomas"
}

const header_ca = {
	register: "Registrar-se",
	register_href: "/register/ca",
	ranking: "Rànquing",
	ranking_href: "/ranking/ca",
	faqs: "FAQs",
	faqs_href: "/faqs/ca",
	languages: "Idiomes"
}


const index_en = {
	welcome: "Welcome!",
	unregistered: "You haven't registered for the event yet?",
	see_ranking: "Do you want to see the ranking?",
	wtf: "What's this? Where am I?",
	header: header_en
};


const index_es = {
	welcome: "¡Bienvenid@!",
	unregistered: "¿No te has registrado aún al evento?",
	see_ranking: "¿Quieres ver la clasificación?",
	wtf: "¿Qué es esto? ¿Dónde estoy?",
	header: header_es
};


const index_ca = {
	welcome: "Benvingut/da!",
	unregistered: "Encara no t'has registrat?",
	see_ranking: "Vols veure la classificació?",
	wtf: "Què és això? On soc?",
	header: header_ca
};


const ranking_en = {
	ranking: "Ranking",
	login: "Login",
	campus: "Campus",
	points: "Points",
	streak: "Streak",
	days: "Days",
	completed_in_time: "Completed in time",
	completed_delayed: "Completed delayed",
	not_completed: "Not completed",
	wrong_title: "No users found in the ranking or something went wrong.",
	wrong_explanation: "(It's most likely the second option, sorry about that. Please contact <a href=\"https://42born2code.slack.com/team/U02237YE10B\"><code>@jvacaris</code></a> if this problem persists after an hour)",
	header: header_en
};


const ranking_es = {
	ranking: "Ranking",
	login: "Login",
	campus: "Campus",
	points: "Puntos",
	streak: "Racha",
	days: "Días",
	completed_in_time: "Completado a tiempo",
	completed_delayed: "Completado tarde",
	not_completed: "No completado",
	wrong_title: "No se han encontrado usuarios o algo salió mal.",
	wrong_explanation: "(Muy probablemente sea la segunda opción, mis disculpas por ello. Por favor contacta con <a href=\"https://42born2code.slack.com/team/U02237YE10B\"><code>@jvacaris</code></a> si el problema persiste dentro de una hora)",
	header: header_es
};


const ranking_ca = {
	ranking: "Rànquing",
	login: "Login",
	campus: "Campus",
	points: "Punts",
	streak: "Ratxa",
	days: "Dies",
	completed_in_time: "Completat a temps",
	completed_delayed: "Completat tard",
	not_completed: "No completat",
	wrong_title: "No s'han trobat usuaris o alguna cosa ha sortit malament.",
	wrong_explanation: "(Molt probablement sigui la segona opció. Si us plau contacta amb <a href=\"https://42born2code.slack.com/team/U02237YE10B\"><code>@jvacaris</code></a> si el problema persisteix en una hora)",
	header: header_ca
};


const newuser_en = {
	welcome: "Welcome, ",
	aocid: "AoC ID",
	login: "Login",
	campus: "Campus",
	instructions: "Please, input your AoC's account <em>ID</em> <span style=\"color:tomato\">(NOT the username)</span>.<br>\
	You'll find it in the <a href=\"https://adventofcode.com/2024/settings\">[Settings]</a> page from AoC's official website.<br>\
	The ID is a several digit number found under the section: <code>What would you like to be called?</code> > <code>(anonymous user <em>#1234567</em>)</code>.<br>\
	Input the full number, including the preceeding <code>#</code>.",
	submit: "Submit",
	ko_explanation: "You're not enrolled in any of the participating campuses or you're not registered in the 42cursus or 42.zip.",
	active_cursus_question: "Active cursus?",
	your_campus: "Your campus",
	lang: "en",
	header: header_en
};


const newuser_es = {
	welcome: "¡Bienvenid@, ",
	aocid: "ID de AoC",
	login: "Login",
	campus: "Campus",
	instructions: "Por favor, introduce el <em>ID</em> de tu cuenta de AoC <span style=\"color:tomato\">(NO el nombre de usuario)</span>.<br>\
	Puedes encontrarlo en la página <a href=\"https://adventofcode.com/2024/settings\">[Settings]</a> en la web oficial de Advent of Code.<br>\
	El ID es un número de varias cifras que se encuentra en la sección <code>What would you like to be called?</code> > <code>(anonymous user <em>#1234567</em>)</code>.<br>\
	Introduce el número completo, incluyendo el <code>#</code> del principio.",
	submit: "Vincular",
	ko_explanation: "No formas parte de ningún campus participante o no estás inscrito en el 42cursus o 42.zip.",
	active_cursus_question: "¿Cursus activo?",
	your_campus: "Tu campus",
	lang: "es",
	header: header_es
};


const newuser_ca = {
	welcome: "Benvingut/da, ",
	aocid: "ID d'AoC",
	login: "Login",
	campus: "Campus",
	instructions: "Si us plau, introdueix l'<em>ID</em> del teu compte d'AoC <span style=\"color:tomato\">(NO el nom d'usuari)</span>.<br>\
	Pots trobar-lo a la pàgina <a href=\"https://adventofcode.com/2024/settings\">[Settings]</a> a la web oficial d'Advent of Code.<br>\
	L'ID és un número de vàries xifres que es troba a la secció <code>What would you like to be called?</code> > <code>(anonymous user <em>#1234567</em>)</code>.<br>\
	Introdueix el número complet, incloent el <code>#</code> del principi.",
	submit: "Vincular",
	ko_explanation: "No formes part de cap campus participant o no estàs inscrit al 42cursus o 42.zip.",
	active_cursus_question: "Cursus actiu?",
	your_campus: "El teu campus",
	lang: "ca",
	header: header_ca
};


const edituser_en = {
	welcome: "Welcome back, ",
	current_aocid: "Current AoC ID",
	login: "Login",
	campus: "Campus",
	instructions: "It looks like your login is already linked to an AoC ID. Press the button below to unlink them.",
	your_group: "If you haven't joined our group in the official AoC website, the code is",
	unlink: "Unlink your accounts",
	lang: "en",
	header: header_en
};


const edituser_es = {
	welcome: "¡Bienvenid@ de nuevo, ",
	current_aocid: "ID de AoC actual",
	login: "Login",
	campus: "Campus",
	instructions: "Parece que tu login ya está vinculado a un ID de AoC. Pulsa el botón de debajo para desvincularla.",
	your_group: "Si aún no te has unido al grupo en la página oficial de AoC, el código es",
	unlink: "Desvincular tus cuentas",
	lang: "es",
	header: header_es
};


const edituser_ca = {
	welcome: "Benvingut/da de nou, ",
	current_aocid: "ID d'AoC actual",
	login: "Login",
	campus: "Campus",
	instructions: "Sembla que el teu login ja està vinculat a un altre ID d'AoC. Prem el botó de sota per desvincular-la.",
	your_group: "Si encara no t'has unit al grup a la página oficial d'AoC, el codi és",
	unlink: "Desvincular els teus comptes",
	lang: "ca",
	header: header_ca
};




const register_en = {
	
	registration: "Registration",
	steps: "Steps",
	step1: "If you don't have one, <a href=\"https://adventofcode.com/2024/auth/login\" target=\"_blank\">create an Advent of Code account</a>.",
	step2: "Log into your 42 Intra account with the button below.",
	step3: "Follow instructions.",
	loginbutton: "Log in with 42 Intra",
	header: header_en
};


const register_es = {
	
	registration: "Registro",
	steps: "Pasos",
	step1: "Si no tienes una, <a href=\"https://adventofcode.com/2024/auth/login\" target=\"_blank\">créate una cuenta en Advent of Code</a>.",
	step2: "Inicia sesión con tu cuenta de la Intra desde el botón de abajo.",
	step3: "Sigue las instrucciones.",
	loginbutton: "Iniciar sesión con Intra 42",
	header: header_es
};


const register_ca = {
	
	registration: "Registre",
	steps: "Passos",
	step1: "Si encara no la tens, <a href=\"https://adventofcode.com/2024/auth/login\" target=\"_blank\">crea't un compte a Advent of Code</a>.",
	step2: "Inicia sessió amb el teu compte de la Intra des del botó de sota.",
	step3: "Segueix les instruccions.",
	loginbutton: "Iniciar sessió amb Intra 42",
	header: header_ca
};


const registerok_en = {

	sucessmsg: "Accounts successfully linked!",
	delaywarn: "It might take several minutes for your login to be displayed in the ranking.",
	joinlbd: "<span style=\"color:tomato\">ATTENTION:</span> Joining our group in the <a href=\"https://adventofcode.com/2024/leaderboard/private\" target=\"_blank\">Advent of Code website</a> with this code is required to complete your registration:",
	header: header_en
};


const registerok_es = {
	
	sucessmsg: "¡Cuentas vinculadas correctamente!",
	delaywarn: "Puede que tu login tarde varios minutos en mostrarse en el ranking.",
	joinlbd: "<span style=\"color:tomato\">IMPORTANTE:</span> Es necesario que estés inscrit@ en nuestro grupo en la <a href=\"https://adventofcode.com/2024/leaderboard/private\" target=\"_blank\">web de Advent of Code</a> con este código para completar tu registro:",
	header: header_es
};


const registerok_ca = {
	
	sucessmsg: "Comptes vinculats correctament!",
	delaywarn: "El teu login pot trigar varis minuts en mostrar-se en el rànquing.",
	joinlbd: "<span style=\"color:tomato\">IMPORTANT:</span> És necessari que estiguis registrat/da al nostre grup a la <a href=\"https://adventofcode.com/2024/leaderboard/private\" target=\"_blank\">web d'Advent of Code</a> amb aquest codi per completar el registre:",
	header: header_ca
};


const deleteok_en = {

	sucessmsg: "Accounts successfully unlinked!",
	delaywarn: "It might take several minutes for your login to stop being displayed in the ranking.",
	joinlbd: "Please make sure to leave the group from the <a href=\"https://adventofcode.com/2024/leaderboard/private\" target=\"_blank\">official AoC website</a> if you're no longer interested in particpating.",
	header: header_en
};


const deleteok_es = {
	
	sucessmsg: "¡Cuentas desvinculadas correctamente!",
	delaywarn: "Puede que tu login tarde varios minutos en dejar de mostrarse en el ranking.",
	joinlbd: "Por favor asegúrate de abandonar nuestro grupo en la <a href=\"https://adventofcode.com/2024/leaderboard/private\" target=\"_blank\">web de Advent of Code</a> si no estás interesad@ en seguir participando.",
	header: header_es
};


const deleteok_ca = {
	
	sucessmsg: "Comptes desvinculats correctament!",
	delaywarn: "El teu login pot trigar varis minuts en deixar de mostrar-se en el rànquing.",
	joinlbd: "Assegura't d'abandonar el nostre grup a la <a href=\"https://adventofcode.com/2024/leaderboard/private\" target=\"_blank\">web d'Advent of Code</a> si ja no estàs interessat/da en seguir participant.",
	header: header_ca
};


const faqs_en = {
	faq0_title: "What's Advent of Code?",
	faq0_text: "(<a href=\"https://adventofcode.com/2024/about\">Long(er) explanation</a>) Advent of Code is an annual set of computer programming challenges that follow an Advent calendar. Every day at 6AM (Madrid timezone), a new challenge consisting of two parts is released. Each part completed awards a star. Challenges increase in difficulty every day.<br>\
	This page is a custom-made ranking with modified rules, but the challenges need to be done in the <a href=\"https://adventofcode.com/2024\">Official Site</a>.",
	faq1_title: "How do I participate?",
	faq1_text: "To participate you need to be a student from a campus in Madrid, Urduliz, Barcelona or Málaga and create an account in the official <a href=\"https://adventofcode.com/2024/auth/login\">Advent of Code</a> page.<br>Then, link your AoC account with your 42 Intra account from the <a href=\"/register/en\">[Register]</a> page. Lastly, join the group on the official AoC page using the code shown after linking your accounts.",
	faq2_title: "Talk me through the rewards",
	faq2_text: "Experience and the friends we made along the way. Additionally, the points earned shown in the <a href=\"/ranking/en\">[Ranking]</a> page will transform into rewards depending on your campus. For now, the rewards will be:<br>\
	<em>- Madrid:</em> (will be decided later)<br><em>- Urduliz:</em> (will be decided later)<br><em>- Barcelona:</em> 1 point -> 1 Coalition Point<br><em>- Málaga:</em> 1 point -> 1 Coalition Point<br>",
	faq3_title: "How do I earn points?",
	faq3_text: "Every day you can earn up to two stars <span class=\"star1\">**</span> by completing both parts of the daily challenge. Each star is worth <code>1000</code> points, but they are distributed among everyone who also earned the star, with a minimum of <code>20</code> points.<br><br>\
	Additionally, these bonuses/penalties are applied:<br>\
	<em>Delays:</em> Every challenge completed after the <em>24h</em> deadline, a <code>50%</code> penalty is applied.<br>\
	<em>Streaks:</em> For every consecutive day where at least a star is earned before the deadline, a <code>2%</code> point bonus gets applied, and stacks up every day. For example, if you manage to complete a challenge from 5 consecutive days, your bonus for day 1 is <code>2%</code>, <code>4%</code> for day 2, <code>6%</code>, <code>8%</code> and <code>10%</code> on day 5. If a streak is broken, the bonus will reset.",
	faq4_title: "I don't see my name in the Ranking",
	faq4_text: "- Did you link your accounts from the <a href=\"/register/en\">[Register]</a> page?<br>\
	- Are you enrolled in the 42cursus or 42.zip in one of the 4 participating campuses?<br>\
	- Did you join the group in the <a href=\"https://adventofcode.com/2024/leaderboard/private\">official site</a> with the code you were given? (If not, you can still find the code in the <a href=\"/register/en\">[Register]</a> page)<br>\
	- Did you wait at least an hour after you did all the steps above?<br>\
	If you followed every step and still missing, please read the next FAQ.",
	faq5_title: "Any other questions? Did you find a bug in this page? Translation errors? <a href=\"/paypal\" target=\"_blank\"><s>Bribe offers?</s></a>",
	faq5_text: "You can contact the organizer through Slack for any questions related with this contest: <a href=\"https://42born2code.slack.com/team/U02237YE10B\"><code>@jvacaris</code></a>.",
	header: header_en
};


const faqs_es = {
	faq0_title: "¿Qué es Advent of Code?",
	faq0_text: "(<a href=\"https://adventofcode.com/2024/about\">Explicación (más) larga</a>, en inglés) Advent of Code es una serie anual de desafíos de programación que sigue un Calendario de Adviento. Cada día a las 6 de la mañana (zona horaria de Madrid), se estrena un nuevo desafío consistente de dos partes. Cada parte completada otorga una estrella. Los desafíos aumentan de dificultad cada día.<br>\
	Esta página es un ranking personalizado con normas modificadas, pero los desafíos están en la <a href=\"https://adventofcode.com/2024\">Página oficial</a>.",
	faq1_title: "¿Cómo participo?",
	faq1_text: "Para participar debes ser estudiante del campus de Madrid, Urduliz, Barcelona o Málaga y crearte una cuenta en la página web oficial de <a href=\"https://adventofcode.com/2024/auth/login\">Advent of Code</a>.<br>Luego, vincula tu cuenta de AoC con tu cuenta de la Intra de 42 desde la página <a href=\"/register/es\">[Registrarse]</a>. Finalmente, únete al grupo en la página oficial de AoC con el código que recibiste tras vincular tus cuentas.",
	faq2_title: "¿Qué gano yo con esto?",
	faq2_text: "La experiencia. Además, los puntos conseguidos que se muestran en la página <a href=\"/ranking/es\">[Ranking]</a> se transformarán en recompensas dependiendo de tu campus. Por ahora, las recompensas serán:<br>\
	<em>- Madrid:</em> (se decidirá más adelante)<br><em>- Urduliz:</em> (se decidirá más adelante)<br><em>- Barcelona:</em> 1 punto -> 1 punto de COA<br><em>- Málaga:</em> 1 punto -> 1 punto de COA<br>",
	faq3_title: "¿Cómo gano puntos?",
	faq3_text: "Cada día puedes ganar hasta dos estrellas <span class=\"star1\">**</span> completando las dos partes del desafío diario. Cada estrella vale <code>1000</code> puntos y se reparten entre todas las personas que también la hayan conseguido, con un mínimo de <code>20</code> puntos.<br><br>\
	Adicionalmente, se aplican estas bonificaciones/penalizaciones:<br>\
	<em>Retrasos:</em> Para desafíos entregados fuera del plazo de <em>24h</em>, se aplica una penalización del <code>50%</code>.<br>\
	<em>Rachas:</em> Por cada día consecutivo que se entregue al menos un desafío a tiempo, se otorgará un <code>2%</code> más de puntos que se acumularán día tras día. Por ejemplo, al completar 5 días seguidos a tiempo, la bonificación será del <code>2%</code> el día 1, <code>4%</code> el día 2, <code>6%</code>, <code>8%</code> y <code>10%</code> el día 5. Al romper una racha, la bonificación se restablece.",
	faq4_title: "No veo mi nombre en el Ranking",
	faq4_text: "- ¿Has vinculado tus cuentas desde la página <a href=\"/register/es\">[Registrarse]</a>?<br>\
	- ¿Estás inscrit@ en el 42cursus o 42.zip en 1 de los 4 campus participantes?<br>\
	- ¿Te has unido al grupo de la <a href=\"https://adventofcode.com/2024/leaderboard/private\">página oficial</a> con el código que se mostró al registrarte? (Si no, puedes seguir encontrando el código en la página <a href=\"/register/es\">[Registrarse]</a>)<br>\
	- ¿Has esperado al menos una hora desde que cumpliste todos los requisitos de arriba?<br>\
	Si has seguido todos los pasos y sigues sin aparecer, por favor lee el siguiente FAQ.",
	faq5_title: "¿Más preguntas? ¿Has encontrado un bug en esta página? ¿Errores de traducción? <a href=\"/paypal\" target=\"_blank\"><s>¿Sobornos?</s></a>",
	faq5_text: "Puedes contactar al organizador por Slack para dudas relacionadas con el evento: <a href=\"https://42born2code.slack.com/team/U02237YE10B\"><code>@jvacaris</code></a>.",
	header: header_es
};


const faqs_ca = {
	faq0_title: "Què és Advent of Code?",
	faq0_text: "(<a href=\"https://adventofcode.com/2024/about\">Explicació (més) llarga</a>, en anglès) Advent of Code és una sèrie anual de reptes que segueix un Calendari d'Advent. Cada dia a les 6 del matí (zona horària de Madrid), s'estrena un nou repte consistent de dues parts. Cada part completada atorga una estrella. Els reptes augmenten de dificultat cada dia.<br>\
	Aquesta pàgina és un rànquing personalitzat amb normes modificades, però els reptes estan a la <a href=\"https://adventofcode.com/2024\">Pàgina oficial</a>.",
	faq1_title: "Com hi participo?",
	faq1_text: "Per participar has de ser estudiant del campus de Madrid, Urduliz, Barcelona o Málaga i crear-te un compte a la pàgina web oficial d'<a href=\"https://adventofcode.com/2024/auth/login\">Advent of Code</a>.<br>Després, vincula el teu compte d'AoC amb el teu compte de la Intra de 42 des de la pàgina <a href=\"/register/ca\">[Registrar-se]</a>. Finalment, uneix-te al grup a la página oficial d'AoC amb el codi que vas rebre al vincular els teus comptes.",
	faq2_title: "Què hi guanyo jo amb això?",
	faq2_text: "L'experiència. A més, els punts aconseguits que es mostren a la pàgina <a href=\"/ranking/ca\">[Rànquing]</a> es transformaran en recompenses depenent del teu campus. Per ara, les recompenses seran:<br>\
	<em>- Madrid:</em> (es decidirà més endavant)<br><em>- Urduliz:</em> (es decidirà més endavant)<br><em>- Barcelona:</em> 1 punt -> 1 punt de COA<br><em>- Málaga:</em> 1 punt -> 1 punt de COA<br>",
	faq3_title: "¿Com guanyo punts?",
	faq3_text: "Cada dia pots guanyar fins a dues estrelles <span class=\"star1\">**</span> completant les dues parts del repte diari. Cada estrella val <code>1000</code> punts que es distribueixen entre totes les persones que també l'hagin aconseguit, amb un mínim de <code>20</code> punts.<br><br>\
	Addicionalment, s'apliquen aquestes bonificacions/penalitzacions:<br>\
	<em>Retards:</em> Per a reptes lliurats fora de termini de <em>24h</em>, s'aplica una penalització del <code>50%</code>.<br>\
	<em>Ratxes:</em> Per cada dia consecutiu que es lliuri a temps almenys un repte, s'atorgarà un <code>2%</code> més punts que s'acumularan dia rere dia. Per exemple, al completar 5 dies seguits a temps, la bonificació serà del <code>2%</code> el dia 1, <code>4%</code> el dia 2, <code>6%</code>, <code>8%</code> i <code>10%</code> el dia 5. Al trencar una ratxa, la bonificació es restablirà.",
	faq4_title: "No veig el meu nom al Rànquing",
	faq4_text: "- Has vinculat els teus comptes des de la pàgina <a href=\"/register/ca\">[Registrar-se]</a>?<br>\
	- Estàs inscrit/a al 42cursus o 42.zip en 1 dels 4 campus participants?<br>\
	- T'has unit al grup de la <a href=\"https://adventofcode.com/2024/leaderboard/private\">pàgina oficial</a> amb el codi que es mostrava al registrar-te? (Si no, pots seguir trobant el codi a la pàgina <a href=\"/register/ca\">[Registrar-se]</a>)<br>\
	- Has esperat almenys una hora des que vas complir tots els requisits de dalt?<br>\
	Si has seguit tots los passos i segueixes sense aparèixer, si us plau llegeix el següent FAQ.",
	faq5_title: "Més preguntes? Has trobat un bug en aquesta pàgina? Errors de traducció? <a href=\"/paypal\" target=\"_blank\"><s>Suborns?</s></a>",
	faq5_text: "Pots contactar amb l'organitzador per Slack per dubtes relacionats amb el concurs: <a href=\"https://42born2code.slack.com/team/U02237YE10B\"><code>@jvacaris</code></a>.",
	header: header_ca
};

module.exports = {
	ranking_ca,
	ranking_es,
	ranking_en,
	index_ca,
	index_es,
	index_en,
	register_ca,
	register_es,
	register_en,
	registerok_ca,
	registerok_es,
	registerok_en,
	deleteok_ca,
	deleteok_es,
	deleteok_en,
	newuser_ca,
	newuser_es,
	newuser_en,
	edituser_ca,
	edituser_es,
	edituser_en,
	faqs_ca,
	faqs_es,
	faqs_en
}