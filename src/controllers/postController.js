const Post = require('../models/Post.js');

// Cria uma nova postagem
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar a postagem', details: error.message });
  }
};

// Lista todas as postagens
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno ao buscar as postagens', details: error.message });
  }
};

// Busca postagens por palavra-chave no título ou conteúdo
exports.searchPosts = async (req, res) => {
  try {
    const { term } = req.query; // Captura o parâmetro da URL (ex: ?term=Unity)
    
    // O $or permite buscar tanto no título quanto no conteúdo. 
    // O $regex com $options: 'i' faz a busca ignorar letras maiúsculas e minúsculas.
    const posts = await Post.find({
      $or: [
        { title: { $regex: term, $options: 'i' } },
        { content: { $regex: term, $options: 'i' } }
      ]
    });
    
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar postagens', details: error.message });
  }
};

// Lê uma postagem específica pelo ID
exports.getPostById = async (req, res) => {
  try {
    // req.params.id captura a variável diretamente do caminho da URL (ex: /posts/12345)
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Postagem não encontrada' });
    }
    
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a postagem', details: error.message });
  }
};

// Edita uma postagem existente
exports.updatePost = async (req, res) => {
  try {
    // O parâmetro { new: true } garante que o banco retorne o documento atualizado, e não a versão antiga
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPost) {
      return res.status(404).json({ message: 'Postagem não encontrada para edição' });
    }
    
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar a postagem', details: error.message });
  }
};

// Exclui uma postagem específica
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    
    if (!deletedPost) {
      return res.status(404).json({ message: 'Postagem não encontrada para exclusão' });
    }
    
    res.status(200).json({ message: 'Postagem excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir a postagem', details: error.message });
  }
};