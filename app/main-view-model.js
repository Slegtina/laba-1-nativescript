import { Observable } from '@nativescript/core'

let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0','1','2','3','4','5','6','7','8','9','.'];
const action = ['-','+','×','÷'];

export function createViewModel() {
  const viewModel = new Observable()
  
  viewModel.message = 0
  
  viewModel.onTap = (args) => {
    var button = args.object
    if (button.text === "C"){
      a = '';
      b = '';
      sign = '';
      finish = false;
      viewModel.set('message', 0)
    }
    else{
      viewModel.set('message', button.text)
      if (digit.includes(button.text)){
        if(b == '' && sign == ''){
          a += button.text;
          viewModel.set('message', a);
        }
        else if (a !== '' && b!== '' && finish){
          b = button.text;
          finish = false;
          viewModel.set('message', b);
        }
        else{
          b += button.text;
          viewModel.set('message', b);
        }
        return;
    }
    if (action.includes(button.text)){
      sign = button.text;
      viewModel.set('message', sign);
      return;
    }
    if(button.text === '='){
      if(b === '') b = a;
      switch(sign){
        case "+":
          a = (+a) + (+b);
          break;
        case "-":
          a = a - b;
          break;    
        case "×":
          a = a * b;
          break; 
        case "÷":
          if (b === '0'){
            viewModel.set('message', 'Ошибка');
            a = '';
            b = '';
            sign = '';
            return;
          }
          a = a / b;
          break;  
      }
      finish = true;
      viewModel.set('message', a);
    }
    }
  }

  return viewModel
}

