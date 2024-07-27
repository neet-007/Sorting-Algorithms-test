import React, { ComponentProps, useEffect, useState } from 'react'

const InfoComponent:React.FC<ComponentProps<'div'> & {name:string}> = ({name, ...props}) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    fetch(`src//SortingInfo/${name}.txt`)
    .then(response => response.text())
    .then(text => setContent(text))
    .catch(e => console.log(e));
  },[name])

  const [sudoCode, info] = content.split('---')

  return (
    <div {...props}>
        <p className='h2'>information</p>
        {sudoCode &&
          <div>
            {sudoCode.split('!').map((val, idx) => (
              idx === 0 ?
              <p key={`info-sudo-code-title-${idx}`} className='h3'>{val}</p>
              :
              val.split('.').map((val_, idx_) => (
                <p key={`info-sudo-code-steps-${idx_}`}>{val_}</p>
              ))
            ))}
          </div>
        }
        {info &&
          <div>
            {info.split('!').map((val, idx) => (
              idx === 0 ?
              <p key={`info-info-title-${idx}`} className='h3'>{val}</p>
              :
              val.split('.').map((val_, idx_) => (
                <p key={`info-info=${idx_}`}>{val_}</p>
              ))
            ))}
          </div>
        }
    </div>
  )
}

export default InfoComponent