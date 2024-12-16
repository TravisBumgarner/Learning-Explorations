import './App.css';
import todoStore, { Todo } from './todoStore';
import {useAsyncEffect} from 'use-async-effect';
import { observer } from 'mobx-react-lite';

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

const TodoView = observer(({todo}: {todo: Todo}) => {
  const onToggleCompleted = () => {
    todo.completed = !todo.completed;
  }

  const onRename = () => {
    todo.task = prompt('Task name', todo.task) || todo.task;
  }

  return (
    <li onDoubleClick={ onRename }>
      <input
        type='checkbox'
        checked={ todo.completed }
        onChange={ onToggleCompleted }
      />
      { todo.task }
      { todo.assignee
        ? <small>{ todo.assignee }</small>
        : null
      }
    </li>
  );
})

const TodoList = observer(() => {
  const onNewTodo = () => {
    todoStore.addTodo('new task');
  }

  return (
    <div>
      { todoStore.report }
      <ul>
        { todoStore.todos.map(
          (todo, idx) => <TodoView todo={ todo } key={ idx } />
        ) }
      </ul>
      { todoStore.pendingRequests > 0 ? <p>Loading...</p> : null }
      <button onClick={ onNewTodo }>New Todo</button>
      <small> (double-click a todo to edit)</small>
    </div>
  );
})

const App = observer(() => {
  useAsyncEffect(async () => {
    todoStore.addTodo("read MobX tutorial");
    await sleep(1000)
    todoStore.addTodo("try MobX");
    await sleep(1000)
    todoStore.todos[0].completed = true;
    await sleep(1000)
    todoStore.todos[1].task = "try MobX in own project";
    await sleep(1000)
    todoStore.todos[0].task = "grok MobX tutorial";
  }
  , [])

  return (
    <TodoList />
  );
})

export default App;
