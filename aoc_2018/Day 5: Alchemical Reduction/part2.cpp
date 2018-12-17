#include <fstream>
#include <vector>
#include <iostream>
#include <cctype>
#include <string>
#include <chrono>

using namespace std::chrono;
using namespace std;


bool check_reactions(char a, char b){
    return (abs(a-b) == 32);
}

string process_input(string filename)
{
    ifstream input_file(filename);
    string line;

    if (input_file.is_open())
    {
       getline(input_file, line);
       input_file.close();
       return line;
    }
}

int main(){
    high_resolution_clock::time_point t1 = high_resolution_clock::now();
    int min_polymer_length = 100000; // TODO THIS IS BAD :shrug:
    string input = process_input("./input.txt");

    string alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (auto letter : alphabet){
        string pre_output = input;
        string output; 

        for (int i = 0; i < pre_output.length(); i++){
            if (tolower(pre_output[i]) != tolower(letter)){
                output += pre_output[i];
            }
        }
        bool still_searching = true;

        while (still_searching){
            bool reaction_found = false;
            for (int i = 0; i < output.length() - 1; i++){
                bool do_react = check_reactions(output[i], output[i+1]);
                while (do_react){
                    // New pairs might be created on deletion of the current reaction. 
                    output.erase(i, 2);
                    reaction_found = true;
                    if( i > 0 && i < output.length() -1){
                        bool do_react_after = check_reactions(output[i], output[i+1]);
                        bool do_react_before = check_reactions(output[i-1], output[i]);
                        if(do_react_after){
                            output.erase(i, 2);
                        } else if (do_react_before){
                            output.erase(i-1, 2);
                        }
                        do_react = do_react_after || do_react_before;
                    }
                    do_react = false;
                }
            }
            if (!reaction_found){
                still_searching = false;
            }
        }
        if(output.length() < min_polymer_length){
            min_polymer_length = output.length();
        }
        // cout << letter<< ": " << output << " " << output.length() << endl;

    }
    cout << "min_polymer_length: " << min_polymer_length << endl;
    high_resolution_clock::time_point t2 = high_resolution_clock::now();
    auto duration = duration_cast<milliseconds>( t2 - t1 ).count();

    cout << duration;

    return 0;
}

