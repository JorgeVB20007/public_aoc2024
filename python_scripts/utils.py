import math

def get_current_day(start: int, current: int) -> int:
	if (current < start):
		return 0
	seconds = current - start
	days = math.floor(seconds / 86400) + 1
	if days > 25:
		days = 25
	return days

def is_delayed(init_time: int, time: int, day: int) -> bool:
	diff_time = (time - init_time)
	if day * 86400 >= diff_time:
		return False
	else:
		return True

