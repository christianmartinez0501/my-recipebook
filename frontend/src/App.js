import React, { useState } from 'react';
import './App.css'; 

function AddCookbookModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(title);
    setTitle('');
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Cookbook</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter cookbook title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

function Cookbook({ title, onClick }) {
  return (
    <div className="cookbook" onClick={onClick}>
      {title}
    </div>
  );
}

function RecipeForm() {
  return (
    <div className="recipe-form">
      <h2>Add New Recipe</h2>
      <form>
        {/* Add your recipe form fields here */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [cookbooks, setCookbooks] = useState([]);
  const [selectedCookbook, setSelectedCookbook] = useState(null);

  const handleAddCookbook = (title) => {
    setCookbooks([...cookbooks, { title, recipes: [] }]);
  };

  const handleCookbookClick = (index) => {
    setSelectedCookbook(index);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Cookbook Manager</h1>
      <button className="add-cookbook-button" onClick={() => setShowModal(true)}>Add Cookbook</button>
      
      {showModal && <AddCookbookModal onClose={handleCloseModal} onSave={handleAddCookbook} />}
      
      <div className="cookbooks-container">
        {cookbooks.map((cookbook, index) => (
          <Cookbook
            key={index}
            title={cookbook.title}
            onClick={() => handleCookbookClick(index)}
          />
        ))}
      </div>

      {selectedCookbook !== null && (
        <div className="recipe-container">
          <h2>Selected Cookbook: {cookbooks[selectedCookbook].title}</h2>
          <RecipeForm />
        </div>
      )}
    </div>
  );
}

export default App;