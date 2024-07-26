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
        <p>
            {sudoCode}
        </p>
        <p>
            {info}
        </p>
    </div>
  )
}

export default InfoComponent