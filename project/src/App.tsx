import React, { useState, useEffect } from 'react';
import { Calculator, History, Equal, Delete, RotateCcw } from 'lucide-react';

type Operation = '+' | '-' | '*' | '/' | '^' | 'sqrt' | 'sin' | 'cos' | 'tan';
type HistoryItem = { calculation: string; result: string };

function App() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [prevNumber, setPrevNumber] = useState<string | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: Operation) => {
    if (prevNumber && operation && !newNumber) {
      calculate();
    }
    setPrevNumber(display);
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    if (!prevNumber || !operation) return;

    let result: number;
    const prev = parseFloat(prevNumber);
    const current = parseFloat(display);

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      case '^':
        result = Math.pow(prev, current);
        break;
      case 'sqrt':
        result = Math.sqrt(prev);
        break;
      case 'sin':
        result = Math.sin((prev * Math.PI) / 180);
        break;
      case 'cos':
        result = Math.cos((prev * Math.PI) / 180);
        break;
      case 'tan':
        result = Math.tan((prev * Math.PI) / 180);
        break;
      default:
        return;
    }

    const calculation = `${prevNumber} ${operation} ${!newNumber ? display : ''}`;
    const resultStr = result.toString();
    
    setHistory(prev => [...prev, { calculation, result: resultStr }]);
    setDisplay(resultStr);
    setPrevNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
    if (e.key === '.') handleDecimal();
    if (e.key === '+') handleOperation('+');
    if (e.key === '-') handleOperation('-');
    if (e.key === '*') handleOperation('*');
    if (e.key === '/') handleOperation('/');
    if (e.key === 'Enter') calculate();
    if (e.key === 'Escape') clear();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [display, operation, prevNumber, newNumber]);

  const clear = () => {
    setDisplay('0');
    setPrevNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const memoryStore = () => {
    setMemory(display);
  };

  const memoryRecall = () => {
    if (memory) {
      setDisplay(memory);
      setNewNumber(true);
    }
  };

  const memoryClear = () => {
    setMemory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-100 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-gray-700" />
            <h1 className="text-2xl font-bold text-gray-700">Calculator</h1>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-gray-600 hover:text-gray-800"
          >
            <History className="w-5 h-5" />
          </button>
        </div>

        {showHistory && (
          <div className="mb-4 p-3 bg-white rounded-lg max-h-40 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-700">History</h2>
              <button
                onClick={clearHistory}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Clear
              </button>
            </div>
            {history.map((item, index) => (
              <div key={index} className="text-sm text-gray-600 mb-1">
                {item.calculation} = {item.result}
              </div>
            ))}
          </div>
        )}

        <div className="bg-white p-4 rounded-lg mb-4 text-right">
          <div className="text-gray-500 text-sm h-6">
            {prevNumber} {operation}
          </div>
          <div className="text-3xl font-semibold text-gray-800">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={memoryClear}
            className="btn bg-gray-200 hover:bg-gray-300"
          >
            MC
          </button>
          <button
            onClick={memoryRecall}
            className="btn bg-gray-200 hover:bg-gray-300"
          >
            MR
          </button>
          <button
            onClick={memoryStore}
            className="btn bg-gray-200 hover:bg-gray-300"
          >
            MS
          </button>
          <button
            onClick={() => handleOperation('sqrt')}
            className="btn bg-gray-200 hover:bg-gray-300"
          >
            √
          </button>

          <button
            onClick={() => handleOperation('sin')}
            className="btn bg-gray-200 hover:bg-gray-300"
          >
            sin
          </button>
          <button
            onClick={() => handleOperation('cos')}
            className="btn bg-gray-200 hover:bg-gray-300"
          >
            cos
          </button>
          <button
            onClick={() => handleOperation('tan')}
            className="btn bg-gray-200 hover:bg-gray-300"
          >
            tan
          </button>
          <button
            onClick={() => handleOperation('^')}
            className="btn bg-gray-200 hover:bg-gray-300"
          >
            x^y
          </button>

          <button
            onClick={() => handleNumber('7')}
            className="btn bg-white hover:bg-gray-100"
          >
            7
          </button>
          <button
            onClick={() => handleNumber('8')}
            className="btn bg-white hover:bg-gray-100"
          >
            8
          </button>
          <button
            onClick={() => handleNumber('9')}
            className="btn bg-white hover:bg-gray-100"
          >
            9
          </button>
          <button
            onClick={() => handleOperation('/')}
            className="btn bg-gray-200 hover:bg-gray-300"
          >
            ÷
          </button>

          <button
            onClick={() => handleNumber('4')}
            className="btn bg-white hover:bg-gray-100"
          >
            4
          </button>
          <button
            onClick={() => handleNumber('5')}
            className="btn bg-white hover:bg-gray-100"
          >
            5
          </button>
          <button
            onClick={() => handleNumber('6')}
            className="btn bg-white hover:bg-gray-100"
          >
            6
          </button>
          <button
            onClick={() => handleOperation('*')}
            className="btn bg-gray-200 hover:bg-gray-300"
          >
            ×
          </button>

          <button
            onClick={() => handleNumber('1')}
            className="btn bg-white hover:bg-gray-100"
          >
            1
          </button>
          <button
            onClick={() => handleNumber('2')}
            className="btn bg-white hover:bg-gray-100"
          >
            2
          </button>
          <button
            onClick={() => handleNumber('3')}
            className="btn bg-white hover:bg-gray-100"
          >
            3
          </button>
          <button
            onClick={() => handleOperation('-')}
            className="btn bg-gray-200 hover:bg-gray-300"
          >
            -
          </button>

          <button
            onClick={() => handleNumber('0')}
            className="btn bg-white hover:bg-gray-100"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="btn bg-white hover:bg-gray-100"
          >
            .
          </button>
          <button onClick={calculate} className="btn bg-blue-500 hover:bg-blue-600 text-white">
            <Equal className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleOperation('+')}
            className="btn bg-gray-200 hover:bg-gray-300"
          >
            +
          </button>

          <button
            onClick={clear}
            className="btn bg-red-500 hover:bg-red-600 text-white col-span-2"
          >
            <Delete className="w-5 h-5 mr-1" />
            Clear
          </button>
          <button
            onClick={() => {
              setDisplay('0');
              setNewNumber(true);
            }}
            className="btn bg-orange-500 hover:bg-orange-600 text-white col-span-2"
          >
            <RotateCcw className="w-5 h-5 mr-1" />
            CE
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;