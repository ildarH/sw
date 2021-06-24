import React, { useState, useEffect } from 'react';

import { Http } from './api/http';

function App() {
	const [loading, setLoading] = useState(true);
	const [people, setPeople] = useState([]);

	useEffect(() => {
		const fetchPeople = async () => {
			let result = await Http.get('people');
      console.log(result);
			setPeople(result.results);
		};
    fetchPeople()
    setLoading(false);
	}, []);

	return <div className='App'>{loading ? <p>loading...</p> : people}</div>;
}

export default App;
