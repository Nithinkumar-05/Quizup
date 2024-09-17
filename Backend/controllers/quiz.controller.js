const Quiz = require('../model/quiz.model')
const User = require('../model/user.model'); // Assuming you have a User model

class QuizController {
    async createQuiz(req, res) {
        try {
            const { title, questions, creator } = req.body;

            // Validate required fields
            if (!title || !questions || !creator) {
                return res.status(400).json({ message: 'Title, questions, and creator are required' });
            }

            // Validate creator if it's a string ID
            const userExists = await User.findOne({ userId: creator }); // Adjust this query as needed
            if (!userExists) {
                return res.status(400).json({ message: 'Invalid creator ID' });
            }

            // Create and save the quiz
            const newQuiz = new Quiz({ title, questions, creator });
            await newQuiz.save();

            res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
        } catch (error) {
            console.error('Error creating quiz:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async getQuizzes(req, res) {
        try {
            const { id } = req.params; // Extract userId from request body
            console.log(id);
            if (!id) {
                return res.status(400).json({ error: 'User ID is required' });
            }
    
            // Aggregate quizzes for a specific creator
            const groupedQuizzes = await Quiz.aggregate([
                {
                    '$match': {
                        'creator': id // Filter by creator (userId)
                    }
                },
                {
                    '$group': {
                        '_id': '$creator', 
                        'quizzes': {
                            '$push': {
                                '_id': '$_id', 
                                'title': '$title', 
                                'createdAt': '$createdAt', 
                                'updatedAt': '$updatedAt', 
                                'questions': '$questions'
                            }
                        }
                    }
                },
                {
                    '$project': {
                        'quizzes': {
                            '$slice': [
                                {
                                    '$map': {
                                        'input': '$quizzes',
                                        'as': 'quiz',
                                        'in': {
                                            '_id': '$$quiz._id',
                                            'title': '$$quiz.title',
                                            'createdAt': '$$quiz.createdAt',
                                            'updatedAt': '$$quiz.updatedAt',
                                            'questions': '$$quiz.questions'
                                        }
                                    }
                                },
                                0, // Start from the beginning of the array
                                { '$size': '$quizzes' } // Take all quizzes
                            ]
                        }
                    }
                },
                {
                    '$unwind': '$quizzes'
                },
                {
                    '$sort': {
                        'quizzes.createdAt': -1 // Sort quizzes by creation date, latest first
                    }
                },
                {
                    '$group': {
                        '_id': '$_id',
                        'quizzes': {
                            '$push': '$quizzes'
                        }
                    }
                }
            ]);
    
            res.status(200).json(groupedQuizzes);
        } catch (error) {
            console.error('Error fetching grouped quizzes:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
    
    
    async getQuiz(req,res){
        try{
            const quizId = req.params.id;
            const quiz = await Quiz.findById(quizId).populate('creator').exec();
            if(!quiz){
                return res.status(404).json({message:'Quiz not found'});
                }
                res.status(200).json({quiz});
            }catch(error){
                console.error('Error fetching quiz:', error);
                res.status(500).json({message:'Server error'});
            }
    }

    async deleteQuiz(req, res) {
        try {
            const { id } = req.params;
            const deletedQuiz = await Quiz.findByIdAndDelete(id);

            if (!deletedQuiz) {
                return res.status(404).json({ message: 'Quiz not found' });
            }

            res.status(200).json({ message: 'Quiz deleted successfully' });
        } catch (error) {
            console.error('Error deleting quiz:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = QuizController;
