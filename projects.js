/*
  Portfolio projects. To add a project, copy one block and edit it.

  type:    "client" | "personal" | "academic"
  status:  "done" | "in-progress"
  image:   path under assets/img/ (optional; without it the card shows a placeholder with `icon`)
  icon:    placeholder icon when there is no image: "chart" | "map" | "bank" | "shop" | "health" | "energy" | "brain"
  sector:  optional, mainly for anonymous client projects, e.g. { es: "Banca", en: "Banking" }
  metric:  optional highlighted result
  links:   optional list; leave empty for confidential client work
  Text fields are bilingual: { es: "...", en: "..." }. Projects are shown in this order.
*/
window.PROJECTS = [
  {
    type: "academic",
    status: "done",
    kicker: "Reinforcement Learning",
    title: { es: "Enseñando a un robot a caminar", en: "Teaching a robot to walk" },
    description: {
      es: "PPO en BipedalWalker-v3 comparando cuatro configuraciones. La clave fue un pequeño incentivo a la exploración (entropía). En grupo con Said Daniel Huarita Mollo.",
      en: "PPO on BipedalWalker-v3 comparing four configurations. The key was a small exploration bonus (entropy). Group work with Said Daniel Huarita Mollo."
    },
    image: "assets/img/reinforcement.gif",
    imageAlt: "Trained PPO agent walking",
    metric: { label: { es: "Recompensa (resuelto ≥ 300)", en: "Reward (solved ≥ 300)" }, value: "300.5 ± 1.0" },
    tags: ["Python", "Stable-Baselines3", "Gymnasium"],
    links: [
      { label: { es: "Repositorio", en: "Repository" }, url: "https://github.com/dmoyitacast/mcdia_reinforcement_learning" }
    ]
  },
  {
    type: "academic",
    status: "done",
    kicker: "Deep Learning",
    title: { es: "Clasificación de imágenes de comida", en: "Food image classification" },
    description: {
      es: "Cuatro CNNs diseñadas desde cero frente a transfer learning con VGG16 (con fine-tuning) y MobileNetV2. En grupo con Said Daniel Huarita Mollo.",
      en: "Four CNNs designed from scratch vs transfer learning with VGG16 (with fine-tuning) and MobileNetV2. Group work with Said Daniel Huarita Mollo."
    },
    image: "assets/img/deeplearning.png",
    imageAlt: "Test accuracy by model",
    metric: { label: { es: "Accuracy en test", en: "Test accuracy" }, value: "85.0%" },
    tags: ["Python", "TensorFlow", "Keras", "CNN"],
    links: [
      { label: { es: "Repositorio", en: "Repository" }, url: "https://github.com/dmoyitacast/mcdia_deep_learning" },
      { label: { es: "Abrir en Colab", en: "Open in Colab" }, url: "https://colab.research.google.com/github/dmoyitacast/mcdia_deep_learning/blob/main/food_classification_cnn.ipynb" }
    ]
  },
  {
    type: "academic",
    status: "done",
    kicker: "Time Series",
    title: { es: "Precio y volatilidad de Boeing", en: "Boeing stock price and volatility" },
    description: {
      es: "ARIMA para la media y eGARCH para la volatilidad, con contrastes formales y predicción a 5 días mediante 1.000 simulaciones Monte Carlo.",
      en: "ARIMA for the mean and eGARCH for volatility, with formal tests and a 5-day forecast from 1,000 Monte Carlo simulations."
    },
    image: "assets/img/timeseries.png",
    imageAlt: "Boeing price forecast vs actual",
    metric: { label: { es: "Reales dentro del IC 95%", en: "Actuals inside 95% CI" }, value: "5 / 5" },
    tags: ["R", "rugarch", "ARIMA", "GARCH"],
    links: [
      { label: { es: "Repositorio", en: "Repository" }, url: "https://github.com/dmoyitacast/mcdia_time_series" },
      { label: { es: "Informe", en: "Report" }, url: "https://dmoyitacast.github.io/mcdia_time_series/boeing_time_series.html" }
    ]
  },
  {
    type: "academic",
    status: "done",
    kicker: "Kernel Methods & Neural Networks",
    title: { es: "kNN, SVC y MLP desde cero", en: "kNN, SVC and MLP from scratch" },
    description: {
      es: "Implementación con NumPy de k-vecinos, un SVC con kernel RBF entrenado con SMO y un perceptrón multicapa con backpropagation, validados frente a scikit-learn.",
      en: "NumPy implementations of k-nearest neighbours, an RBF-kernel SVC trained with SMO and a multilayer perceptron with backpropagation, validated against scikit-learn."
    },
    image: "assets/img/kernel.png",
    imageAlt: "Decision boundaries of my SVC vs scikit-learn",
    metric: { label: { es: "R² del MLP propio", en: "Own MLP R²" }, value: "0.993" },
    tags: ["Python", "NumPy", "SVM", "MLP"],
    links: [
      { label: { es: "Repositorio", en: "Repository" }, url: "https://github.com/dmoyitacast/mcdia_kernel_methods_neural_networks" }
    ]
  },
  {
    type: "academic",
    status: "done",
    kicker: "Unsupervised Learning",
    title: { es: "Descubriendo temáticas en 3.000 documentos", en: "Discovering topics in 3,000 documents" },
    description: {
      es: "TF-IDF calculado desde cero, filtrado por transition point, PCA y K-Means. Encuentra 4 temas muy limpios: religión, tecnología, espacio y deportes.",
      en: "TF-IDF computed from scratch, transition-point filtering, PCA and K-Means. It finds 4 clean topics: religion, technology, space and sports."
    },
    image: "assets/img/unsupervised.png",
    imageAlt: "Word cloud of the space cluster",
    metric: { label: { es: "Dimensiones", en: "Dimensions" }, value: { es: "20.529 → 330", en: "20,529 → 330" } },
    tags: ["Python", "scikit-learn", "Plotly", "NLP"],
    links: [
      { label: { es: "Repositorio", en: "Repository" }, url: "https://github.com/dmoyitacast/mcdia_unsupervised_learning" },
      { label: { es: "Gráficos interactivos", en: "Interactive charts" }, url: "https://nbviewer.org/github/dmoyitacast/mcdia_unsupervised_learning/blob/main/code/unsupervised_learning_david_moya.ipynb" }
    ]
  },
  {
    type: "academic",
    status: "done",
    kicker: "Basic Regression",
    title: { es: "¿Qué explica el PIB per cápita de un país?", en: "What drives a country's GDP per capita?" },
    description: {
      es: "Regresión lineal múltiple sobre 227 países: imputación por región, transformaciones logarítmicas, Best Subset Selection, diagnóstico de outliers y comprobación de hipótesis.",
      en: "Multiple linear regression on 227 countries: regional imputation, log transforms, Best Subset Selection, outlier diagnostics and assumption checks."
    },
    image: "assets/img/regression.png",
    imageAlt: "Correlation matrix",
    metric: { label: { es: "R² ajustado", en: "Adjusted R²" }, value: "0.824" },
    tags: ["Python", "statsmodels", "OLS"],
    links: [
      { label: { es: "Repositorio", en: "Repository" }, url: "https://github.com/dmoyitacast/mcdia_basic_regression" }
    ]
  }
];
