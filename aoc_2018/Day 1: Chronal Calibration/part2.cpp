#include <iostream>
#include <fstream>
#include <string>
#include <set>

using namespace std;

int main()
{
    bool found_twice{0};
    int running_count{0};
    set<int> seen_numbers;
    string line;
    while (!found_twice)
    {

        ifstream myfile("input.txt");
        if (myfile.is_open())
        {
            while (getline(myfile, line))
            {
                running_count += stoi(line);
                cout << running_count << endl;
                found_twice = seen_numbers.find(running_count) != seen_numbers.end();
                if (found_twice)
                {
                    cout << running_count;
                    return 0;
                }
                seen_numbers.insert(running_count);
            }
            myfile.close();
        }
    }
}