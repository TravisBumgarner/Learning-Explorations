import csv
import matplotlib.pyplot as plt

COLORS = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']

def readcsv(filename):	
    file = open(filename, "rU")
    reader = csv.reader(file)
    output = []
    next(reader)

    for row in reader:
        instant,dteday,season,yr,mnth,holiday,weekday,workingday,weathersit,temp,atemp,hum,windspeed,casual,registered,cnt = row
        output.append([float(temp), float(cnt)])
    
    file.close()
    return output


def linear_regression(points):
    # h = theta_0 + theta_1 * x
    theta_0 = 0
    theta_1 = 0
    alpha = 1
    m = len(points)
    for i in range(0,6):
        for x, _ in points:
            h = theta_0 + theta_1 * x
            plt.scatter(x,h, c=COLORS[i])

        delta_theta_0 = 0
        delta_theta_1 = 0
        cost_0 = 0
        cost_1 = 0

        for x, y in points:
            h = theta_0 + theta_1 * x
            cost_0 += (h - y)
            cost_1 += (h - y) * x
        
        theta_0 = theta_0 - (1/m) * (cost_0)
        theta_1 = theta_1 - (1/m) * (cost_1)


def scatter_plot(points):
    for x, y in points:
        plt.scatter(x, y, c="black")


def main():
    temps_and_counts = readcsv('day.csv')

    scatter_plot(temps_and_counts)
    linear_regression(temps_and_counts)

    plt.show()
if __name__ == "__main__":
    main()
