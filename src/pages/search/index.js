import React, { useState, useEffect } from 'react';
import Hero from '../../components/hero';
import { getPets } from '../../api/petfinder';
import Pet from '../../components/pet';
// Import useSearchParams
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {

  // Get searchParams object from useSearchParams

  const [petNameToFind, setPetNameToFind] = useSearchParams();  // Get query parameter using searchParams object
  const petName = petNameToFind.get('name');
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function getPetsData() {
      const petsData = await getPets('', petName);

      setPets(petsData);
    }

    getPetsData();
  }, [petName]);

  return (
    <div className="page">
      <Hero displayText={`Results for ${petName}`} />

      <h3>Pets available for adoption near you</h3>

      <main>
        <div className="grid">
          {pets.map((pet) => (
            <Pet animal={pet} key={pet.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
