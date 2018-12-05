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

bool check_reactions(char a, char b){
    bool same_letter = tolower(a) == tolower(b);
    bool opposite_case = (isupper(a) && !isupper(b)) || (isupper(b) && !isupper(a));
    return (same_letter && opposite_case);
}

string process_input(string filename)
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
    return output[0];
}

void tests(){
    cout << "True: " << check_reactions('A', 'a') << endl;
    cout << "True: " << check_reactions('a', 'A') << endl;
    cout << "False: " << check_reactions('A', 'A') << endl;
    cout << "False: " << check_reactions('a', 'a') << endl;
    cout << "False: " << check_reactions('b', 'a') << endl;
    cout << "False: " << check_reactions('a', 'b') << endl; 
}

int main(){
    high_resolution_clock::time_point t1 = high_resolution_clock::now();

    string input = process_input("./input.txt");
    string output = input;
    bool still_searching = true;

    while (still_searching){
        bool reaction_found = false;
        for (int i = 0; i < output.length() - 1; i++){
            bool do_react = check_reactions(output[i], output[i+1]);
            if (do_react){
                output.erase(i, 2);
                reaction_found = true;
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
