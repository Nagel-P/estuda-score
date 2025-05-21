import React from 'react';
import backgroundImg from '../../assets/Background.jpg';

const rewardsData = [
  { id: 1, name: 'Café Grátis na Cantina', points: 200, image: 'img/reward1.png' },
  { id: 2, name: 'Desconto no Estacionamento', points: 500, image: 'img/reward2.png' },
  { id: 3, name: 'Camiseta da Universidade', points: 1000, image: 'img/reward3.png' }
];

const Rewards = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-8"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-10 text-center">
        Recompensas Disponíveis
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {rewardsData.map((reward) => (
          <div
            key={reward.id}
            className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 text-center"
          >
            <img
              src={reward.image}
              alt={reward.name}
              className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-gray-200"
            />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{reward.name}</h2>
            <p className="text-gray-600 mb-4">{reward.points} pontos</p>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition">
              Resgatar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
