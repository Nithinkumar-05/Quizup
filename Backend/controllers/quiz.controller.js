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
