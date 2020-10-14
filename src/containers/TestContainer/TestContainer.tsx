// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { User, QueryData } from '../../interfaces/query.interface'
// import { GET_USER_BY_ID } from '../../apis/graphQL/queries'
// import { CREATE_USER } from '../../apis/graphQL/mutations'
// import client from '../../client'

// export default function TestContainer(): JSX.Element {
//   const [newUser, setNewUser] = useState<User>({
//     id: null,
//     username: '',
//     email: '',
//     password: ''
//   });

//   //NOTE: useQuery hook example - run immediately when called. Pulls from server
//   const {data: userData, loading, error: userDataError} = useQuery<QueryData>(GET_USER_BY_ID, {
//     variables: {
//       id:3
//     }
//   })

//   //NOTE: useMutation hook example: saveUser needs to be called explicitly in order to run
//   const [saveUser, { data: savedUserData, error: savedUserError }] = useMutation<{createUser: User}>(
//     CREATE_USER, {
//     variables: {
//       username: newUser?.username,
//       password: newUser?.password,
//       email: newUser?.email
//     //NOTE: if an update cached operation is needed, it comes here: https://www.apollographql.com/docs/react/data/mutations/
//     }
//   })

// //NOTE: example of the client reading from cache instead of server, re-using the initial query name
// const cacheRead = client.readQuery({
//   query: GET_USER_BY_ID
//   ,
//   variables: {
//     id: 3,
//   },
// })
// console.log('cacheRead --->', cacheRead);


//   function handleChange(e: ChangeEvent<HTMLInputElement>){
//     e.persist();
//     setNewUser(prevState => (
//       {...prevState, [e.target.id]: e.target.value}
//     ))
//   }

//   function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     saveUser()
//     setNewUser({
//       id: null,
//       username: '',
//       email: '',
//       password: ''
//     })
//   }

//   return (
//   <>
//     <div>
//       {loading ? <p>loading</p> : <p>Hello {userData?.getUserbyId.username}</p> }
//     </div>
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="username">username</label>
//       <input id="username" type="text" name="username" value={newUser?.username} onChange={handleChange}/>
//       <label htmlFor="password">password</label>
//       <input id="password" type="text" name="password" value={newUser?.password} onChange={handleChange}/>
//       <label htmlFor="email">email</label>
//       <input id="email" type="text" name="email" value={newUser?.email} onChange={handleChange}/>
//       <button type="submit">Submit</button>
//     </form>
//     <div>
//   {savedUserData && <p>You have created {savedUserData?.createUser.username}, id:{savedUserData?.createUser.id}</p> }
//   {savedUserError && <p>Error: {savedUserError.message}</p>}
//     </div>

//   </>
//   )
// }

export default {};