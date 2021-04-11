// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

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
      let result = await client.put(tableName, { email: email });
      console.log('put: ' + result.success ? 'succeeded' : 'failed');

  } catch(error) {
      console.log(error)
  }
}

async function getRowsFromCalendarTable({email}) {
  const tableName = 'calendar';
  try {
    // Get the data from the calendar table with the given email
    const e = new String(email)
    if(email == 'undefined')
    {
      console.log('email is undefined')
    }
    else
    {
      result = await client.get(tableName, {email: email})
    }
    
  } catch(error) {
      console.log(error)
  }

  return result

}

export default (req, res) => {

  // Get the email that was passed in
  const { email } = req.query

  if(email)
  {
    getRowsFromCalendarTable({email}).then( res.status(200).json({ name: result })  )
  }

}

// Add this to prevent it running multiple times and returning a warning of "API resolved without sending a response"
export const config = {
  api:{
      externalResolver: true,
  },
}
