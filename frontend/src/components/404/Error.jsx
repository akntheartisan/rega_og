import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import dragonImage from "../../../src/assets/images/game.png"
import './Error.css'

const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };
  const handleReload = () => {
    window.location.reload(); 
  };

  useEffect(() => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let dragon = { x: 50, y: 50, width: 50, height: 50 }; // Adjust size if needed
    let gravity = 0.6;
    let lift = -15;
    let velocity = 0;
    let obstacles = [];
    let gameOver = false;

    const image = new Image(); 
    image.src = dragonImage; 

    const drawDragon = () => {
      ctx.drawImage(image, dragon.x, dragon.y, dragon.width, dragon.height); // Draw the image instead of the rectangle
    };

    const updateDragon = () => {
      velocity += gravity;
      dragon.y += velocity;

      if (dragon.y + dragon.height > canvas.height) {
        dragon.y = canvas.height - dragon.height;
        velocity = 0;
      }
    };

    const jump = () => {
      velocity += lift;
    };

    const generateObstacles = () => {
      if (obstacles.length < 1 || obstacles[obstacles.length - 1].x < canvas.width - 300) {
        obstacles.push({
          x: canvas.width,
          y: canvas.height - 40,
          width: 20,
          height: 40,
          speed: 3,
        });
      }
    };

    const updateObstacles = () => {
      obstacles.forEach((obs) => {
        obs.x -= obs.speed;
        ctx.fillStyle = 'black';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Check collision
        if (
          dragon.x < obs.x + obs.width &&
          dragon.x + dragon.width > obs.x &&
          dragon.y < obs.y + obs.height &&
          dragon.y + dragon.height > obs.y
        ) {
          gameOver = true;
        }
      });

      // Remove off-screen obstacles
      obstacles = obstacles.filter((obs) => obs.x + obs.width > 0);
    };

    const gameLoop = () => {
      if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateDragon();
        drawDragon();
        generateObstacles();
        updateObstacles();
        requestAnimationFrame(gameLoop);
      } else {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Game Over!', canvas.width / 2 - 80, canvas.height / 2);
      }
    };

    window.addEventListener('keydown', jump);

    gameLoop();

    return () => {
      window.removeEventListener('keydown', jump);
    };
  }, []);

  return (
    <div style={{ height: '100vh' }} className="error-parent d-flex justify-content-center align-items-center flex-column">
      <div className="error-child text-center" style={{ padding: '50px' }}>
        <h1 style={{ fontSize: '12rem', marginBottom: '4rem', color: '#F28123' }}>404</h1>
        <h2>Sorry, we couldn't find this page.</h2>
        <h4>
          But don't worry, you can find plenty of other things on our{' '}
          <span style={{ color: '#F28123' }}>Homepage</span>.
        </h4>
       

        {/* Game canvas */}
        <div style={{ marginTop: '1rem' }}>
          <canvas id="gameCanvas" width="800" height="200" style={{ borderBottom: '2px solid #000'}}></canvas>
          <p>Press any key to jump!</p>
        </div>
        <button
          onClick={handleGoHome}
          style={{
            color: 'white',
            outline: 'none',
            border: 'none',
            backgroundColor: '#F28123',
            padding: '10px 20px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '2rem',
            marginRight: '2rem',
          }}
        >
          Back to Home
        </button>
        <button
          onClick={handleReload}
          style={{
            color: 'white',
            outline: 'none',
            border: 'none',
            backgroundColor: '#F28123',
            padding: '10px 20px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '2rem',
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default Error;