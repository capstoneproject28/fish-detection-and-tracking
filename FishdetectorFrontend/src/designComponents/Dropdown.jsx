import React from 'react'
import '../css/dropdown.css'
import 'font-awesome/css/font-awesome.min.css';

export default function DropDown () {
  return (

      <div>
  <legend>Dropdown</legend>
  <details open="">
    <summary>
      Select your Machine Learning Algorithm 
      <i className="fa fa-caret-down" aria-hidden="true"></i>
    </summary>
    <div>
      <label>
        <input type="radio" name="radio" />
        <span>Yolo</span>
      </label>
      <label>
        <input type="radio" name="radio" defaultChecked="" />
        <span>CNN</span>
      </label>
      <label>
        <input type="radio" name="radio" />
        <span>RNN</span>
      </label>
      <label>
        <input type="radio" name="radio" />
        <span>RCNN</span>
      </label>
      <div className="fade" />
    </div>
  </details>
</div>

    
  )
}