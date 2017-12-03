exchangeFactory.$inject = ['$http'];
function exchangeFactory ($http) {
    return {
        getCurrencies: getCurrencies,
        calculateCurrency: calculateCurrency
      };
  
      function calculateCurrency(amount, from, to){
        return amount * 1.77;
      }
  
      function getCurrencies(){
        return {
          sell: {
            selected: {
              'shortName': 'BTN', 
              'name': 'Bitcoin',
            }
          },
          get: {
            selected: {
              'shortName': 'USD', 
              'name': 'US Dollar',
            }
          },
          all: [
            {'shortName': 'BTN', 'name': 'Bitcoin', 'imageClass': 'BTC'},
            {'shortName': 'USD', 'name': 'US Dollar', 'imageClass': 'BTC'},
            {'shortName': 'ETH', 'name': 'Ethereum', 'imageClass': 'ETH'},
          ]
        };
      }
};

export default exchangeFactory;
  