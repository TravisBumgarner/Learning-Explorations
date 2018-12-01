#include <iostream>
#include <fstream>
#include <string>
#include <set>
#include <vector>

using namespace std;

int main()
{
    vector<int64_t> inputs{1, 2, 3, 4, 5};
    auto iterator(inputs.begin());

    while (true)
    {
        if (iterator == inputs.end())
        {
            iterator = inputs.begin();
        }
        cout << *iterator << endl;
        iterator++;
    }
    return 0;
}