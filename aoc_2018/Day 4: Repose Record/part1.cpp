#include <fstream>
#include <vector>
#include <iostream>
#include <map>
#include <string>
#include <algorithm>    // std::sort
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

int get_guard_id(string input){
        smatch matches;
        regex rgx_input("(\\d+)");
        regex_search(input, matches, rgx_input);

        return stoi(matches[1].str());
}

int main(){

    regex rgx_input("\\[(\\d{4})-(\\d{2})-(\\d{2})\\s(\\d{2}):(\\d{2})\\]\\s(.+)");
    smatch matches;

    vector<string> input = process_input("./input.txt");
    sort(input.begin(), input.end());

    int active_guard_id = -1;
    int falls_alseep_minute = -1;
    int wakes_up_minute = -1;
    vector<int> guard_log{0};

    map<int, vector<int>> guard_logs;

    for (auto line: input){
        regex_search(line, matches, rgx_input);
        int year = stoi(matches[1].str());
        int month = stoi(matches[2].str());
        int day = stoi(matches[3].str());
        int hour = stoi(matches[4].str());
        int minute = stoi(matches[5].str());
        string message = matches[6].str();
        
        // cout << year << '-' << month << '-' << day << ' ' << hour << ":" << minute;
        if(message.find("Guard") == 0){
            active_guard_id = get_guard_id(message);
        } else if (message.find("falls") == 0){
            falls_alseep_minute = minute;
        } else if(message.find("wakes") == 0) {
            wakes_up_minute = minute;
        }
        cout << endl;

        // cout << message << endl;

    }

    return 0;
}
