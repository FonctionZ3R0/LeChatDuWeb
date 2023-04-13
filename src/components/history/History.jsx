import React from 'react';
import './history.css'

const History = (props) => {

    return (
        <div>
          {props.history.length > 0 ? (
            <ul>
              {props.history.map((item) => (
                <li key={item.id}>
                  {item.role == 'system' || item.role == 'assistant' ? (
                    <div className="iaBubble">
                      <p className="iaText">{item.content}</p>
                      <div className="leftArrow"></div>
                      <div className="leftArrowOverlap"></div>
                    </div>
                  ) : (
                    <div className="myBubble">
                      <p className="myText">{item.content}</p>
                      <div className="rightArrow"></div>
                      <div className="rightArrowOverlap"></div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : ''}
        </div>
    )
}

export default History