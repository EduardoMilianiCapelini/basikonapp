async function chargeDonnees() {
    try {
      const container = document.getElementById('cards-line');
      const sumText = document.getElementById('sumText');
      container.innerHTML = ''; // nettoyage de l'écran
      sumText.textContent='';

      const resUsers = await fetch('http://localhost:8000/users');
      const users = await resUsers.json();
      const resSum = await fetch('http://localhost:8000/sumAges');
      const sumAges = await resSum.json();

      // Création de cards
      users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card';
        const name = document.createElement('p');
        name.textContent = user.name;
        const age = document.createElement('p');
        age.textContent = "âge : "+user.age;
        card.appendChild(name);
        card.appendChild(age);
        container.appendChild(card);
    });

      // Création du text sumAges 
      if (sumAges){
        sumText.textContent = "La somme des âges des Eduardos est "+sumAges.ageSum;
      }
    } catch (erro) {
      console.log(erro);
    }
  }
  
  // Charge les données à l'ouverture de la page
  chargeDonnees();
      