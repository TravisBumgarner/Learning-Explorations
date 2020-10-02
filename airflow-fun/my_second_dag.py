from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime, timedelta

def hello1():
  print("Hello 1")

def hello2():
  print("Hello 2")

default_args = {
  'owner': 'travis',
  'depends_on_past': False,
  'start_date': datetime.now(),
  'email': ['travis@foo.com'],
  'email_on_failure': False,
  'email_on_retry': False,
  'retries': 5,
  'retry_delay': timedelta(seconds=30)
}

dag = DAG('travis', default_args=default_args, schedule_interval=timedelta(minutes=2))

task_1 = PythonOperator(
  task_id='python_task_hello_1',
  python_callable=hello1,
  dag=dag
)


task_2 = PythonOperator(
  task_id='python_task_hello_2',
  python_callable=hello2,
  dag=dag
)


task_2.set_upstream(task_1)
