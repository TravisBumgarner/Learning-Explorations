#include <fstream>
#include <vector>
#include <iostream>
#include <string>
#include <regex>

using namespace std;

vector<string> process_input(string filename)
{
    vector<string> output;
    ifstream input_file(filename);
    string line;

    if (input_file.is_open())
    {
        while (getline(input_file, line))
        {   
            output.push_back(line);
        }
        input_file.close();
    }
    return output;
}

int main(){

    regex rgx("#(\\d+)\\s@\\s(\\d+),(\\d+): (\\d+)x(\\d+)");
    smatch matches;

    int duplicates_count = 0;

    const int GRID_WIDTH = 5000;
    const int GRID_HEIGHT = 5000;
    static double fabric_array[GRID_WIDTH][GRID_HEIGHT] = {0};

    vector<string> input = process_input("./input.txt");

    for (auto line: input){
        regex_search(line, matches, rgx);
        int x_start = stoi(matches[2].str());
        int y_start = stoi(matches[3].str());
        int x_width = stoi(matches[4].str());
        int y_width = stoi(matches[5].str());

        cout << "x_start " << x_start << " y_start: " << y_start << " x_width: " << x_width << " y_width:" << y_width << endl;
        
        for (int x = x_start; x< x_start + x_width; x++){
            for (int y = y_start; y< y_start + y_width; y++){
                fabric_array[x][y] += 1;
            }
        }
    }

    for (int x = 0; x < GRID_WIDTH; x++){
        for (int y = 0; y < GRID_HEIGHT; y++){
            // cout << fabric_array[x][y] << ' ';
            if(fabric_array[x][y] > 1){
                duplicates_count++;
            }
        }
        // cout << endl;
    }

    cout << duplicates_count << endl;
    return 0;
}


