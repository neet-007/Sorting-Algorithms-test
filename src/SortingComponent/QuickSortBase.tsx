import React, {ComponentProps, useEffect, useState} from 'react'
import { BoxType } from '../App';

const QuickSortBase:React.FC<ComponentProps<'div'> & {arr:BoxType[], isSorting:boolean}> = ({arr, isSorting}) => {
    const [localArr, setLocalArr] = useState<BoxType[]>([...arr])
    const [currindex, setCurrIndex] = useState<number>(-1);

    useEffect(() => {
      if (!isSorting){
        return
      };

      let timeOut = undefined;
      if (currindex === -1){
        setCurrIndex(localArr.length - 1);
        setLocalArr(prevArr => {
            const newArr = [...prevArr]
            newArr[newArr.length - 1].className = 'move-right';
            newArr[newArr.length - 2].className = 'move-left';

            return newArr
        })
      }else{
          timeOut = setTimeout(() => {
              setLocalArr(prevArr => {
                  const newArr = [...prevArr];
                  const temp = newArr[currindex];
                  newArr[currindex] = newArr[currindex - 1];
                  newArr[currindex - 1] = temp;

                  newArr[currindex].className = '';
                  if (currindex > 1){
                      newArr[currindex - 1].className = 'move-right';
                      newArr[currindex - 2].className = 'move-left';
                    }else{
                        newArr[currindex - 1].className = '';
                    };

                    return newArr;
                });

                setCurrIndex(prev => {
                    if (prev === 1){
                        return -1
                    };
                    return prev - 1
                })
            },500)
        }

      return () => {
        if (timeOut){
            clearTimeout(timeOut)
        }
      };
    },[currindex, isSorting])

    return (
      <div>
        <div className='container'>
          {localArr.map((num, i) => {
            return <div key={`box-bubble-${num.val}-${i}`} className={`box ${num.className}`} style={{height:`${10 * num.val}px`}}>
              {num.val}
            </div>
            })}
          </div>
      </div>
    )
}

export default QuickSortBase