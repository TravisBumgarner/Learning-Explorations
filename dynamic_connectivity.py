import random

sample_list = [[1,2],[3,4],[5,6],[7,8],[7,9],[2,8],[0,5],[1,9]]

def desired_length(list_of_lists):
	merged_list = []
	for each in list_of_lists:
		merged_list += each
	return len(list(set(merged_list)))

def combined_length(list_of_lists):
	merged_list = []
	for each in list_of_lists:
		merged_list += each
	return len(merged_list)

def dynamic_connectivity(pairs):
	if desired_length(pairs) == combined_length(pairs):
		return pairs
	else:
		dynamic_connections = []
		for pair in pairs:
			if(len(dynamic_connections)==0):
				dynamic_connections.append(pair)
			else:
				for dc_index, dynamic_connection in enumerate(dynamic_connections):
					merged_connection = list(set(pair + dynamic_connection))
					if (len(merged_connection) < (len(pair) + len(dynamic_connection))):
						dynamic_connections[dc_index] = merged_connection
						break
					elif(dc_index == len(dynamic_connections)-1):
						dynamic_connections.append(pair)
		return dynamic_connectivity(dynamic_connections)

print(dynamic_connectivity(sample_list))