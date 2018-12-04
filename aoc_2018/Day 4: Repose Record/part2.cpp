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
    
    map<int, vector<int>> guard_logs;

    cout << "   ";
    for (int m = 0; m<=59; m++){
        if(m< 10) cout << 0;
        cout << m << " " ;
    }
    cout << endl;

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

            bool log_exists = guard_logs.find(active_guard_id) != guard_logs.end();
            if(log_exists){
                for (int m = falls_alseep_minute; m < wakes_up_minute; m++){
                    guard_logs[active_guard_id][m] += 1;
                    // cout << guard_logs[active_guard_id][m];
                }

                cout << "#"<< active_guard_id << " ";
                for (auto g: guard_logs[active_guard_id]){
                    cout << g << "  "; 
                }
                cout << endl;

            } else {
                vector<int> guard_log{};
                for (int m = 0; m<=59; m++){
                    if (m >= falls_alseep_minute && m < wakes_up_minute){
                        guard_log.push_back(1);
                    } else {
                        guard_log.push_back(0);
                    }
                }

                cout << "#"<< active_guard_id << " ";
                for (auto g: guard_log){
                    cout << g << "  "; 
                }
                cout << endl;
                guard_logs[active_guard_id] = guard_log;
            }
        }
    }

    cout << endl << endl;

    int sleepiest_guard_id = -1;
    int sleepiest_guard_max_sleep_minute = 0;
    int sleepiest_guard_total_sleep_time = 0;
    int sleepiest_guard_max_sleep_time = 0;

    for (auto gl: guard_logs){
        // cout << gl.first << " " << endl;
        int total_sleep_time = 0;
        int max_sleep_time = -1;
        int max_sleep_minute = -1;
        int minute = 0;

        for (auto l: gl.second){
            // cout << l << " ";
            total_sleep_time += l;
            if (l > max_sleep_time){
                max_sleep_time = l;
                max_sleep_minute = minute;
            }
            minute++;
        }

        if (max_sleep_time > sleepiest_guard_max_sleep_time){
            sleepiest_guard_id = gl.first;
            sleepiest_guard_max_sleep_time = max_sleep_time;
            sleepiest_guard_max_sleep_minute = max_sleep_minute;
            sleepiest_guard_total_sleep_time = total_sleep_time;
        }

        cout << "#" << gl.first<< " max_sleep_minute:" << max_sleep_minute << " total_sleep_time:" << total_sleep_time << " max_sleep_time:" << max_sleep_time;
        cout << endl;
        cout << "#" << sleepiest_guard_id << " max_sleep_minute:" << sleepiest_guard_max_sleep_minute << " total_sleep_time:" << sleepiest_guard_total_sleep_time << endl;
    }
    cout << "Part 2: " << sleepiest_guard_id * sleepiest_guard_max_sleep_minute;

    return 0;
}
