#include <fstream>
#include <vector>
#include <iostream>
#include <map>
#include <string>

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

bool off_by_one_char(string input_left, string input_right)
{
    int off_by_count = 0;
    int comparisons = input_left.length();

    for (int i = 1; i < comparisons; i++)
    {
        if (input_left[i] != input_right[i])
        {
            off_by_count++;
        }
    }

    return off_by_count == 1;
}

string generate_key(string input_left, string input_right)
{
    int comparisons = input_left.length();
    string output{""};

    for (int i = 0; i <= comparisons; i++)
    {
        if (input_left[i] == input_right[i])
        {
            output += input_left[i];
        }
    }
    return output;
}

int main()
{
    vector<string> box_ids;
    map<char, int> letter_counts;

    box_ids = process_input("./input.txt");

    for (auto box_id_left : box_ids)
    {
        for (auto box_id_right : box_ids)
        {
            if (off_by_one_char(box_id_left, box_id_right))
            {
                cout << box_id_left << " " << box_id_right << endl;
                cout << generate_key(box_id_left, box_id_right) << endl;
            }
        }
    }
    return 0;
}
