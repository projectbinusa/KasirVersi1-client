export const titik = (x) => {
    return x.toLocaleString("id-ID", {style:"currency", currency:"IDR"});
}

export const getMonthName = (x) => {
    const date = new Date();
  
    return date.toLocaleString('en-US', { month: 'short' });
  }