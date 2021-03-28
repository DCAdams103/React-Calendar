// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

const NoSQLClient = require('oracle-nosqldb').NoSQLClient;
let result;

let client = new NoSQLClient({
  auth: {
      iam: {
          configFile: './.oci/config',
          profile: 'Default'
      }
  }
});

async function putRowsIntoCalendarTable(email) {
  const tableName = 'calendar';
  try {
      // Put the data into the calendar table.
      let result = await client.put(tableName, { id: 1, name: 'Dylan', email: email });
      console.log('put: ' + result.success ? 'succeeded' : 'failed');

  } catch(error) {
      console.log(error)
  }
}

async function getRowsFromCalendarTable({email}) {
  const tableName = 'calendar';
  try {
    // Get the data from the calendar table with the given email
      result = await client.get(tableName, { id: 1, email: email });
      
  } catch(error) {
      console.log(error)
  }

  return result

}

export default (req, res) => {

  // Get the email that was passed in
  const { email } = req.query

  try {

    if(!email) { 
      return res.status(400).json({message: 'email required'}) 
    }

  } catch(error)
  {
    console.log(error)
  }

  
  // getRowsFromCalendarTable(email)

  res.status(200).json({ name: getRowsFromCalendarTable(email) })
}
