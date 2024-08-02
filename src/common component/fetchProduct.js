const fetchProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        setProduct(data);
      } else {
        throw new Error('Empty response');
      }
    } catch (error) {
      setError('Error fetching product details.');
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };
  