from posixpath import split
from dotenv import load_dotenv, find_dotenv
import os
import requests
import json
import time
import math
import pandas as pd
from utils import *
from game_values import game_values, init_time
import csv

load_dotenv(find_dotenv())


last_day = 25

current_time: int = math.floor(time.time())
# current_time: int = 1730523601	#TODO Delete after testing


#*	THIS YEAR'S
#	init_time: int = 1733029200

#!	LAST YEAR'S
# init_time: int = 1701406800

#!	NOVEMBER TEST
# init_time: int = 1730437200

class status:
	uncompleted = -1
	delayed = 0
	completed = 1

holy_list = pd.DataFrame(columns=('id', 'login', 'logged', 'campus', 'streak', 'max_streak', 'points'))

new_days = []
for x in range(1, get_current_day(init_time, current_time) + 1):
	new_days.append("day_{0}".format(str(x)))
holy_list[new_days] = None


cookies: list = (os.getenv('PYTHON_AOC_COOKIES').split(" "))
groups_links: list = (os.getenv('PYTHON_AOC_GROUPS').split(" "))
r = {"members": {}, "owner_id": 0, "event": 2024}
for idx in range(0, len(cookies)):
	thecookie = {"session": cookies[idx]}
	temp_r: dict = requests.get(groups_links[idx], cookies=thecookie).json()
	r["members"].update(temp_r["members"])


#! TESTING PURPOSES
# with open('python_scripts/current.json', 'r') as file:
# 	r = json.load(file)


ids_and_users = {}

with open('private/userids.csv', 'r') as file:
	u = csv.DictReader(file, fieldnames=["id", "login", "campus"])	#* 22: Madrid | 37: Málaga | 40: Urduliz | 46: Barcelona
	next(u)
	for row in u:
		ids_and_users[row['id']] = {"login": row['login'], "campus": row['campus']}






def get_day_completionists(users: dict, day_int: int, star_n_int: int) -> dict: 
	day: str = str(day_int)
	star_n: str = str(star_n_int)
	retval = {}
	for user in users["members"].values():
		if user["id"] in ids_and_users:
			if day in user["completion_day_level"] and star_n in user["completion_day_level"][day]:
				delay: int = math.floor((user["completion_day_level"][day][star_n]["get_star_ts"] - (init_time + (day_int - 1) * 86400)) / 86400)
				retval[user["id"]] = delay
	return retval




def get_all_completion_amounts(users: dict) -> list:
	today = get_current_day(init_time, current_time)
	full_list = []
	for day in range(1, today + 1):
		dayresult = []
		for star in range(1, 3):
			completion_list = get_day_completionists(users, day, star)
			completions = 0
			for user in completion_list.keys():
				if completion_list[user] < 1:
					completions += 1
				else:
					completions += game_values.DELAY_NERF
			dayresult.append(completions)
		full_list.append(dayresult)
	return full_list


# Returns a list with an item per day. Each item has a list of 2 ints with the state of each star.
def get_user_stars(users: dict, id: str, day_int: int) -> list:
	retval = []
	for day in range(1, day_int + 1):
		current = []
		if str(day) in users['members'][id]['completion_day_level']:
			for star in range(1, 3):
				if str(star) in users['members'][id]['completion_day_level'][str(day)]:
					time: int = users['members'][id]['completion_day_level'][str(day)][str(star)]['get_star_ts']
					if is_delayed(init_time, time, day):
						current.append(status.delayed)
					else:
						current.append(status.completed)
				else:
					current.append(status.uncompleted)
		else:
			current = [status.uncompleted, status.uncompleted]
		retval.append(current)
	return retval


def assign_points(all_completions: list, all_days: list):
	points = []


def fill_list_of_users(users: dict):
	#?	Getting all IDs
	ids = []
	for user in users['members'].keys():
		ids.append(user)
	
	#?	Getting all 42 logins and whether the user is logged in.
	logged = []
	logins = []
	campuses = []
	idsaux = []
	for id in ids:
		if id in ids_and_users:
			idsaux.append(id)
			logins.append(ids_and_users[id]['login'])
			logged.append(True)		#* 22: Madrid | 37: Málaga | 40: Urduliz | 46: Barcelona
			if (ids_and_users[id]['campus'] == '22'):
				campuses.append('MAD')
			elif (ids_and_users[id]['campus'] == '37'):
				campuses.append("MAL")
			elif (ids_and_users[id]['campus'] == '40'):
				campuses.append("UDZ")
			elif (ids_and_users[id]['campus'] == '46'):
				campuses.append("BCN")
			else:
				campuses.append("ERR")	
	
	ids = idsaux
	holy_list['id'] = ids
	holy_list['login'] = logins
	holy_list['logged'] = logged
	holy_list['campus'] = campuses

	#?	Getting completion results for every day, each day and star with every user
	all_days = []
	for day in range(1, get_current_day(init_time, current_time) + 1):
		all_days.append([])
	for id in ids:
		user_stars = get_user_stars(r, str(id), get_current_day(init_time, current_time))
		for day in range(1, get_current_day(init_time, current_time) + 1):
			all_days[day - 1].append(user_stars[day - 1])
	
	#?	Getting the streak per day per person
	all_streaks = []
	for day in range(1, get_current_day(init_time, current_time) + 1):
		all_streaks.append([])
	for user in range(0, len(ids)):
		streak = 0
		for day in range(0, get_current_day(init_time, current_time)):
			if all_days[day][user][0] == status.completed or all_days[day][user][1] == status.completed:
				streak += 1
			else:
				streak = 0
			all_streaks[day].append(streak)

	#?	Getting points per day and star per user
	all_completions = get_all_completion_amounts(r)
	all_points = []
	for day in range(1, get_current_day(init_time, current_time) + 1):
		all_points.append([])
	for user in range(0, len(ids)):
		for day in range(0, get_current_day(init_time, current_time)):
			day_points = []
			for star in range(0, 2):
				points = 0
				if all_days[day][user][star] != status.uncompleted:
					points = game_values.POINTS_PER_STAR / all_completions[day][star]
					if points < game_values.MINIMUM_POINTS:
						points = game_values.MINIMUM_POINTS
					points *= 1 + all_streaks[day][user] * game_values.STREAK_BONUS
				if all_days[day][user][star] == status.delayed:
					points *= game_values.DELAY_NERF
				day_points.append(points)
			all_points[day].append(day_points)

	#?	Merging status, streaks and points into dictionaries.
	all_day_data = []
	for day in range(1, get_current_day(init_time, current_time) + 1):
		all_day_data.append([])
	for day in range(0, get_current_day(init_time, current_time)):
		for user in range(0, len(ids)):
			cell_data = []
			for star in range(0, 2):
				star_data = {}
				star_data['status'] = all_days[day][user][star]
				star_data['streak'] = all_streaks[day][user]
				star_data['points'] = all_points[day][user][star]
				cell_data.append(star_data)
			all_day_data[day].append(json.dumps(cell_data))


	for day in range(1, get_current_day(init_time, current_time) + 1):
		holy_list["day_{0}".format(str(day))] = all_day_data[day - 1]

	#?	Adding all points for each user.
	all_total_points = []
	for user in range(0, len(ids)):
		points = 0
		for day in range(0, get_current_day(init_time, current_time)):
			points += all_points[day][user][0]
			points += all_points[day][user][1]
		all_total_points.append(points)

	holy_list['points'] = all_total_points

	#?	Getting streaks and max streaks
	streaks = []
	max_streaks = []

	for user in range(0, len(ids)):
		current_streak = 0
		current_max_streak = 0
		current_max_iter = 0
		streak_broken = False
		for day in reversed(range(0, get_current_day(init_time, current_time))):
			if all_days[day][user][0] == status.completed or all_days[day][user][1] == status.completed:
				current_max_iter += 1
				if current_max_streak < current_max_iter:
					current_max_streak = current_max_iter
				if (not streak_broken):
					current_streak += 1
			else:
				current_max_iter = 0
				if day != get_current_day(init_time, current_time) - 1:
					streak_broken = True
		streaks.append(current_streak)
		max_streaks.append(current_max_streak)
	holy_list['streak'] = streaks
	holy_list['max_streak'] = max_streaks
	




fill_list_of_users(r)


holy_list = holy_list.sort_values(by=['points'], ascending=False)


pd.DataFrame.to_csv(holy_list, path_or_buf='private/ranking.csv')
