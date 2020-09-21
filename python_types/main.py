from typing import Union

def add(x: Union[int, str]) -> Union[int, str]:
    return x + x


def foo() -> None:
    y = add('a')

foo()