#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main()
{
    int running_count{0};
    string line;
    ifstream myfile("input.txt");
    if (myfile.is_open())
    {
        while (getline(myfile, line))
        {
            running_count += stoi(line);
        }
        myfile.close();
        cout << running_count << endl;
    }

    else
        cout << "Unable to open file";

    return 0;
}