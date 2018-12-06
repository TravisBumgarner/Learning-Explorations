#include <fstream>
#include <vector>
#include <iostream>
#include <cctype>
#include <string>
#include <chrono>

using namespace std::chrono;
using namespace std;

/* 
Runtimes: 
1052
1039
1040
*/

// bool check_reactions_slowest(char a, char b){
//     bool same_letter = tolower(a) == tolower(b);
//     bool opposite_case = (isupper(a) && !isupper(b)) || (isupper(b) && !isupper(a));
//     return (same_letter && opposite_case);
// }

// bool check_reactions_slower(char a, char b){
//     return ((tolower(a) == tolower(b)) && ((isupper(a) && !isupper(b)) || (isupper(b) && !isupper(a))));
// }

bool check_reactions(char a, char b){
    return (abs(a-b) == 32);
}

// string process_input_no_difference(string filename)
// {
//     vector<string> output;
//     ifstream input_file(filename);
//     string line;

//     if (input_file.is_open())
//     {
//         while (getline(input_file, line))
//         {
//             output.push_back(line);
//         }
//         input_file.close();
//     }
//     return output[0];
// }

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

// void tests(){
//     cout << "True: " << check_reactions('A', 'a') << endl;
//     cout << "True: " << check_reactions('a', 'A') << endl;
//     cout << "False: " << check_reactions('A', 'A') << endl;
//     cout << "False: " << check_reactions('a', 'a') << endl;
//     cout << "False: " << check_reactions('b', 'a') << endl;
//     cout << "False: " << check_reactions('a', 'b') << endl; 
// }

int main(){
    high_resolution_clock::time_point t1 = high_resolution_clock::now();

    string input = process_input("./input.txt");
    string output = input;
    bool still_searching = true;

    // while (still_searching){
    //     bool reaction_found = false;
    //     for (int i = 0; i < output.length() - 1; i++){
    //         bool do_react = check_reactions(output[i], output[i+1]);
    //         if (do_react){
    //             output.erase(i, 2);
    //             reaction_found = true;
    //         }
    //     }
    //     if (!reaction_found){
    //         still_searching = false;
    //     }
    // }

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


    cout << output.length() << endl;

    high_resolution_clock::time_point t2 = high_resolution_clock::now();
    auto duration = duration_cast<milliseconds>( t2 - t1 ).count();

    cout << duration;

    return 0;
}
