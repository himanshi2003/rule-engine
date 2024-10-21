"use client";

import { useState } from 'react';
import { createRule, combineRules } from '@/app/services/api'; // Removed unused evaluateRule import
import ASTTree from '@/app/components/ASTTree';

const Home = () => {
    const [rule, setRule] = useState('');
    const [ruleName, setRuleName] = useState('');
    const [combinedRules, setCombinedRules] = useState<string[]>(['']); // Start with one empty input field for combined rules
    const [ast, setAst] = useState<any>(null);
    const [loading, setLoading] = useState(false); // To handle loading state

    const handleCreateRule = async () => {
        setLoading(true); // Set loading to true while processing
        try {
            const data = await createRule(rule, ruleName);
            setAst(data); // Update AST on success
        } catch (error) {
            console.error("Error creating rule:", error);
            alert("Failed to create rule. Please check your inputs or try again later.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleCombineRules = async () => {
        setLoading(true); // Set loading state during combination
        try {
            const data = await combineRules(combinedRules);
            setAst(data); // Update AST after combining
        } catch (error) {
            console.error("Error combining rules:", error);
            alert("Failed to combine rules. Please try again later.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <h1>Rule Engine</h1>

            {/* Section to create a rule */}
            <div>
                <h2>Create Rule</h2>
                <input
                    type="text"
                    placeholder="Rule Name"
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Rule"
                    value={rule}
                    onChange={(e) => setRule(e.target.value)}
                />
                <button onClick={handleCreateRule} disabled={loading}>
                    {loading ? 'Creating...' : 'Create Rule'}
                </button>
            </div>

            {/* Section to combine rules */}
            <div>
                <h2>Combine Rules</h2>
                {combinedRules.map((rule, index) => (
                    <input
                        key={index}
                        type="text"
                        value={rule}
                        onChange={(e) => {
                            const newRules = [...combinedRules];
                            newRules[index] = e.target.value;
                            setCombinedRules(newRules);
                        }}
                    />
                ))}
                <button
                    onClick={() => setCombinedRules([...combinedRules, ''])}
                    disabled={loading}
                >
                    Add Rule
                </button>
                <button onClick={handleCombineRules} disabled={loading}>
                    {loading ? 'Combining...' : 'Combine Rules'}
                </button>
            </div>

            {/* Display AST if available */}
            <div>
                {ast && <ASTTree root={ast} />}
            </div>
        </div>
    );
};

export default Home;
