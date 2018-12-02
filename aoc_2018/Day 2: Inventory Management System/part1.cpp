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

bool check_twos(string input)
{
    return false;
}

//  std::pair<std::map<char,int>::iterator,bool> ret;
//   ret = mymap.insert ( std::pair<char,int>('z',500) );
//   if (ret.second==false) {
//     std::cout << "element 'z' already existed";
//     std::cout << " with a value of " << ret.first->second << '\n';
//   }

map<char, int> count_letters(string input)
{
    map<char, int> letter_counts;

    for (auto letter : input)
    {
        std::pair<std::map<char, int>::iterator, bool> ret;
        ret = letter_counts.insert(pair<char, int>(letter, 1));
        if (!ret.second)
        {
            letter_counts.at(letter) += 1;
        }
    }

    return letter_counts;
}

int main()
{
    vector<string> box_ids;
    map<char, int> letter_counts;

    box_ids = process_input("./input.txt");
    int twos_found = 0;
    int threes_found = 0;

    for (auto box_id : box_ids)
    {
        letter_counts = count_letters(box_id);
        bool was_twos_found = false;
        bool was_threes_found = false;

        for (auto letter_count : letter_counts)
        {
            cout << letter_count.first;
            if (letter_count.second == 2)
                was_twos_found = true;
            if (letter_count.second == 3)
                was_threes_found = true;
        }

        if (was_twos_found)
            twos_found += 1;
        if (was_threes_found)
            threes_found += 1;
    }

    cout << "Twos found: " << twos_found << "\nThrees found: " << threes_found << endl;
    cout << twos_found * threes_found << endl;
    return 0;
}
