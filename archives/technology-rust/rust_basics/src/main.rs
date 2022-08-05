fn add(x: i32, y: i32) -> i32 {
    x + y
}

const LIFE: u8 = 42;

fn main() {
    let x = 1;
    let y = 2;

    let my_sum = add(x, y);

    println!("Adding {} and {} give {}", x, y, my_sum);

    println!("The answer to life is {LIFE}")
}
