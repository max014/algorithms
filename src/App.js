import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import HeaderMenu from './Components/HeaderMenu';
import Visualizer from './Components/Visualizer';

const { Header, Content } = Layout;

class App extends Component {
  state = {
    current: 'Quick Sort',
    arr: [],
    done: false,
    steps: [],
    highlight: [],
    qty: 30,
    speed: 250
  }

  makeArray = () => {
    clearTimeout(this.animation);
    const arr = [];
    for(let i=0; i<this.state.qty; i++){
      let num = Math.random();
      num = Math.floor(num * 200);
      arr.push(num);
    }
    this.setState({arr: arr, highlight: [], done: false, steps: []});
  }

  select = e => {
    this.setState({current: e.key});
    this.makeArray();
  }

  componentDidMount(){
    this.makeArray();
  }

  sort = () => {
    clearTimeout(this.animation);
    switch(this.state.current){
      case 'Quick Sort':
        this.quicksort();
        break;
      case 'Merge Sort':
        this.mergesort();
        break;
      case 'Selection Sort':
        this.selectionsort();
        break;
      case 'Bubble Sort':
        this.bubblesort();
        break;
      default:
        break;
    }
  }

  animate = (i) => {
    if(this.state.steps[i+1]){
      this.animation = setTimeout(() => this.animate(i+1), 500 - this.state.speed);
    } else {
      this.setState({done: true});
    }
    this.setState({arr: this.state.steps[i].arr, highlight: this.state.steps[i].highlight});
  }

  quicksort = async () => {
    const steps = [];
    const runQuicksort = (arr) => {
      quicksort(arr, 0, arr.length-1);
      return arr;
    }

    const quicksort = (arr, left, right) => {
      if(left >= right){
        return;
      }
      let pivot = arr[Math.floor((left + right)/2)];
        let index = partition(arr, left, right, pivot);
        quicksort(arr, left, index-1);
        quicksort(arr, index, right);
    }

    function partition(arr, left, right, pivot){
      while(left <= right){
        while(arr[left] < pivot){
          left++;
        }
        while(arr[right] > pivot){
          right--;
        }
        if(left <= right){
          [arr[left], arr[right]] = [arr[right], arr[left]];
          left++;
          right--;
        }
        steps.push({arr: [...arr], highlight: [left, right]});
      }
      return left;
    }

    runQuicksort([...this.state.arr]);
    await this.setState({steps: steps});
    this.animate(0);
  }

  mergesort = async () => {
    const steps = [];

    const merge = (arr, start, mid, end) => {
      let start2 = mid + 1;
      if (arr[mid] <= arr[start2]) { 
          return; 
      }
      while (start <= mid && start2 <= end) { 
          // If element 1 is in right place 
          if (arr[start] <= arr[start2]) { 
              start++; 
          } 
          else { 
              let value = arr[start2]; 
              let index = start2; 
              // Shift all the elements between element 1 
              // element 2, right by 1. 
              while (index !== start) { 
                  arr[index] = arr[index - 1];
                  index--;
              } 
              arr[start] = value; 
              // Update all the pointers 
              start++;
              mid++;
              start2++;
              steps.push({arr: [...arr], highlight: [start, start2]});
          }
      } 
    }

    const runMergeSort = (arr, l, r) => {
        if (l < r) {  
            let m = Math.floor((l + r) / 2); 
            // Sort first and second halves 
            runMergeSort(arr, l, m); 
            runMergeSort(arr, m + 1, r); 
            merge(arr, l, m, r); 
        } 
    }

    const a = [...this.state.arr];
    runMergeSort(a, 0, a.length - 1);
    await this.setState({steps: steps});
    this.animate(0);
  }

  bubblesort = async () => {
    const steps = [];
    let i, j;

    const a = [...this.state.arr];
    for (i = 0; i < a.length-1; i++){
      // Last i elements are already in place  
      for (j = 0; j < a.length-i-1; j++){
        steps.push({arr: [...a], highlight: [j, j+1]})
        if (a[j] > a[j+1]){
          [a[j], a[j+1]] = [a[j+1], a[j]];
        }
      } 
    }
    await this.setState({steps: steps});
    this.animate(0);
  }

  selectionsort = async () => {
    const steps = [];
    let i, j;

    const a = [...this.state.arr];
    for (i = 0; i < a.length; i++){
      for (j = i; j < a.length; j++){
        steps.push({arr: [...a], highlight: [i, j]})
        if (a[i] > a[j]){
          [a[i], a[j]] = [a[j], a[i]];
        }
      } 
    }
    await this.setState({steps: steps});
    this.animate(0);
  }

  changeQty = (val) => {
    this.setState({qty: val});
  }

  changeSpeed = (val) => {
    this.setState({speed : val})
  }

  render(){
    return (
      <Layout style={{height: '100vh'}}>
        <Header>
          <HeaderMenu />
        </Header>
        <Content style={{padding: '50px'}}>
          <Visualizer 
            select={this.select}
            done={this.state.done}
            algo={this.state.current} 
            arr={this.state.arr}
            highlight={this.state.highlight}
            makeArray={this.makeArray}
            sort={this.sort}
            changeQty={this.changeQty}
            changeSpeed={this.changeSpeed}
            mouseUp={this.makeArray}/>
        </Content>
      </Layout>
    );
  }
}

export default App;
