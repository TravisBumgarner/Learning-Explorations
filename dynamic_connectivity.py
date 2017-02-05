import random

sample_list = [[1,2],[3,4],[5,6],[7,8],[7,9],[2,8],[0,5],[1,9]]

#Converts the list_of_lists to a single list, removes duplicates, and calculates length
def desired_length(list_of_lists):
	merged_list = []
	for each in list_of_lists:
		merged_list += each
	return len(list(set(merged_list)))

#Converts the list_of_lists to a single list and calculates length
def combined_length(list_of_lists):
	merged_list = []
	for each in list_of_lists:
		merged_list += each
	return len(merged_list)

def dynamic_connectivity(pairs):
	#Check if the length of pairs is the desired length or not.
	#This is the base case for recursion.
	if desired_length(pairs) == combined_length(pairs):
		return pairs
	else:
		dynamic_connections = []
		#Loop through each pair and compare it to dynamic_connections
		for pair in pairs:
			# If dynamic_connections is empty, append pair
			if(len(dynamic_connections)==0):
				dynamic_connections.append(pair)
			else:
			# Else, compare current pair to each list in dynamic_connections
				for dc_index, dynamic_connection in enumerate(dynamic_connections):
					merged_connection = list(set(pair + dynamic_connection))
					if (len(merged_connection) < (len(pair) + len(dynamic_connection))):
					# If one of the numbers in pair is found in the current list, replace
					# the list with the set() of the list and pair
						dynamic_connections[dc_index] = merged_connection
						break
					elif(dc_index == len(dynamic_connections)-1):
					# Else if set() didn't find a match and at the end of the list, append the current pair
						dynamic_connections.append(pair)
		return dynamic_connectivity(dynamic_connections)
		#Recurssively go through the list again.

print(dynamic_connectivity(sample_list))