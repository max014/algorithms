import React, {Component} from 'react';
import {Slider, Dropdown, Menu, Icon, Button, Row, Col} from 'antd';
import styles from './index.module.css';

class Sort extends Component {
  state = {
    algo: 'Quick Sort',
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
    this.setState({algo: e.key});
    this.makeArray();
  }

  componentDidMount(){
    this.makeArray();
  }

  sort = () => {
    clearTimeout(this.animation);
    switch(this.state.algo){
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
    const menu = (
    <Menu 
      onClick={this.select}
      selectedKeys={[this.state.algo]}
      title={<span><Icon type="setting" />Choose Algorithm</span>}
      className={styles.Width}>
      <Menu.Item key={'Quick Sort'}>Quick Sort</Menu.Item>
      <Menu.Item key={'Merge Sort'}>Merge Sort</Menu.Item>
      <Menu.Item key={'Selection Sort'}>Selection Sort</Menu.Item>
      <Menu.Item key={'Bubble Sort'}>Bubble Sort</Menu.Item>
    </Menu>
  );
    return (
      <React.Fragment>
        <div className={styles.DashBoard}>
          <Row type="flex" justify="space-between">
            <Col>
              <div className={styles.AlgoContainer}>
                <Dropdown overlay={menu}>
                  <div>
                    Algorithm: 
                    <Button className={styles.AlgoDropDown}>
                      {this.state.algo} <Icon type="down" />
                    </Button>
                  </div>
                </Dropdown>
              </div>
            </Col>
            <Col>
              <Row type="flex">
                <Col style={{marginRight: '10px'}}><Button onClick={this.makeArray}>Reset</Button></Col>
                <Col><Button type='primary' onClick={this.sort}>Sort</Button></Col>
              </Row>
            </Col>
          </Row>
          <div>
            Speed:
            <Slider
              onAfterChange={this.changeSpeed}
              defaultValue={250}
              min={1}
              max={500}
              onChange={this.slideSpeed}/>
          </div>
          <div>
            Quantity:
            <Slider
              onAfterChange={this.makeArray}
              defaultValue={30}
              min={5}
              max={200}
              onChange={this.changeQty}/>
          </div>
        </div>

        <div className={styles.Visualizer}>
          {this.state.arr.map((elem, i) => (
            <div
              key={i}
              className={styles.Element}
              style={{
                height: elem,
                backgroundColor: this.state.done ? 'limegreen' : this.state.highlight.includes(i) ? 'blue' : '#c00'}}>
              </div>
            ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Sort;