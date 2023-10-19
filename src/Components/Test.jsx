import React, { useEffect } from 'react'

const Test = () => {
  const [data, setData] = React.useState(null)
  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/s3i092qfs1jtb')
      .then((res) =>res.json())
      .then((data) => console.log(data))
      .catch(err => console.log(err))
  }, [])
  return (
    <div>
      {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScC8qV-e_5Iema-e9zKQRXTuhv3pd7QREwGWCsF1U20GpWgEQ/viewform?embedded=true" width="640" height="873" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> */}
    </div>
  )
}

export default Test