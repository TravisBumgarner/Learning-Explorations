sample_list = [[1,2],[3,4],[5,6],[7,8],[7,9],[2,8],[0,5],[1,9]]

def dynamic_connectivity(pairs):
	dynamic_connections = []
	for index in range(0,len(pairs)-1):
		pair1 = pairs[index]
		pair2 = pairs[index+1]
		merged_connection = list(set(pair1 + pair2))
		if(len(merged_connection) < (len(pair1)+len(pair2))):
			dynamic_connections.append(merged_connection)
		else:
			dynamic_connections.append(pair2)
	return dynamic_connections

print(dynamic_connectivity(sample_list))