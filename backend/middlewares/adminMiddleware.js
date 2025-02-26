exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).render('error', { 
      message: 'Accès refusé. Vous devez être administrateur pour accéder à cette page.' 
    });
  }
  next();
};