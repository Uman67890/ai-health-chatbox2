import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Moon, Scale, PlusCircle, Heart, Ruler, Info, Trophy, CheckCircle2, AlertCircle } from 'lucide-react';
import { saveMetric, getAllMetrics } from '../services/healthTrackingService';
import { type MetricType } from '../types';

export const HealthDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'log' | 'calculator'>('overview');
    const [metrics, setMetrics] = useState(getAllMetrics());

    // Form states
    const [weightInput, setWeightInput] = useState('');
    const [heightInput, setHeightInput] = useState('');
    const [sleepInput, setSleepInput] = useState('');
    const [bpSysInput, setBpSysInput] = useState('');
    const [bpDiaInput, setBpDiaInput] = useState('');
    const [stepsInput, setStepsInput] = useState('');

    useEffect(() => {
        setMetrics(getAllMetrics());
    }, [activeTab]);

    const handleLog = (type: MetricType, value: string, unit: string) => {
        if (!value) return;
        saveMetric(type, parseFloat(value), unit);
        setMetrics(getAllMetrics());

        // Reset specific inputs
        if (type === 'weight') setWeightInput('');
        if (type === 'height') setHeightInput('');
        if (type === 'sleep') setSleepInput('');
        if (type === 'blood_pressure_sys') setBpSysInput('');
        if (type === 'blood_pressure_dia') setBpDiaInput('');
        if (type === 'steps') setStepsInput('');

        alert(`${type.replace(/_/g, ' ')} logged!`);
    };

    const calculateFitnessScore = () => {
        const latestWeight = metrics.weight.length > 0 ? metrics.weight[metrics.weight.length - 1].value : null;
        const latestHeight = metrics.height.length > 0 ? metrics.height[metrics.height.length - 1].value : null;
        const latestSleep = metrics.sleep.length > 0 ? metrics.sleep[metrics.sleep.length - 1].value : null;
        const latestBPSys = metrics.blood_pressure_sys.length > 0 ? metrics.blood_pressure_sys[metrics.blood_pressure_sys.length - 1].value : null;
        const latestBPDia = metrics.blood_pressure_dia.length > 0 ? metrics.blood_pressure_dia[metrics.blood_pressure_dia.length - 1].value : null;

        if (!latestWeight || !latestHeight || !latestSleep || !latestBPSys || !latestBPDia) {
            return { score: 0, status: 'Incomplete Data', color: '#64748b' };
        }

        let score = 0;
        let breakdown = [];

        // BMI Calculation (Weight Score: 30)
        const bmi = latestWeight / ((latestHeight / 100) ** 2);
        let bmiScore = 0;
        if (bmi >= 18.5 && bmi < 25) bmiScore = 30;
        else if (bmi >= 25 && bmi < 30) bmiScore = 20;
        else if (bmi < 18.5) bmiScore = 15;
        else bmiScore = 10;
        score += bmiScore;

        // Sleep Score (30)
        let sleepScore = 0;
        if (latestSleep >= 7 && latestSleep <= 9) sleepScore = 30;
        else if (latestSleep >= 6 || latestSleep <= 10) sleepScore = 20;
        else sleepScore = 10;
        score += sleepScore;

        // Blood Pressure Score (40)
        let bpScore = 0;
        if (latestBPSys < 120 && latestBPDia < 80) bpScore = 40;
        else if (latestBPSys < 130 && latestBPDia < 80) bpScore = 30;
        else if (latestBPSys < 140 || latestBPDia < 90) bpScore = 20;
        else bpScore = 10;
        score += bpScore;

        let status = 'Fair';
        let color = '#f59e0b';
        if (score >= 85) { status = 'Excellent'; color = '#10b981'; }
        else if (score >= 70) { status = 'Good'; color = '#0ea5e9'; }
        else if (score < 50) { status = 'Needs Improvement'; color = '#ef4444'; }

        return { score, status, color, bmi: bmi.toFixed(1), breakdown: { bmiScore, sleepScore, bpScore } };
    };

    const fitness = calculateFitnessScore();

    return (
        <div className="dashboard-container">
            <div className="dashboard-header-premium glass">
                <div className="header-info">
                    <Heart className="header-pulse" size={32} color="#ef4444" />
                    <div>
                        <h2>Health Intelligence</h2>
                        <p>Real-time fitness tracking & analysis</p>
                    </div>
                </div>
                <div className="dashboard-tabs">
                    <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
                    <button className={activeTab === 'log' ? 'active' : ''} onClick={() => setActiveTab('log')}>Log Metrics</button>
                    <button className={activeTab === 'calculator' ? 'active' : ''} onClick={() => setActiveTab('calculator')}>Fitness Calculator</button>
                </div>
            </div>

            <div className="dashboard-body">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="overview-grid-premium"
                        >
                            <div className="metric-card-premium weight">
                                <div className="card-top">
                                    <Scale className="icon" size={24} />
                                    <span className="label">Weight</span>
                                </div>
                                <div className="card-value">
                                    {metrics.weight.length > 0 ? metrics.weight[metrics.weight.length - 1].value : '--'} <span className="unit">kg</span>
                                </div>
                                <div className="card-footer">
                                    {metrics.height.length > 0 ? `Height: ${metrics.height[metrics.height.length - 1].value} cm` : 'Add Height'}
                                </div>
                            </div>

                            <div className="metric-card-premium sleep">
                                <div className="card-top">
                                    <Moon className="icon" size={24} />
                                    <span className="label">Sleep</span>
                                </div>
                                <div className="card-value">
                                    {metrics.sleep.length > 0 ? metrics.sleep[metrics.sleep.length - 1].value : '--'} <span className="unit">hrs</span>
                                </div>
                                <div className="card-footer">Last Night</div>
                            </div>

                            <div className="metric-card-premium bp">
                                <div className="card-top">
                                    <Heart className="icon" size={24} />
                                    <span className="label">Blood Pressure</span>
                                </div>
                                <div className="card-value">
                                    {metrics.blood_pressure_sys.length > 0 && metrics.blood_pressure_dia.length > 0
                                        ? `${metrics.blood_pressure_sys[metrics.blood_pressure_sys.length - 1].value}/${metrics.blood_pressure_dia[metrics.blood_pressure_dia.length - 1].value}`
                                        : '--/--'}
                                    <span className="unit">mmHg</span>
                                </div>
                                <div className="card-footer">Ideal: 120/80</div>
                            </div>

                            <div className="metric-card-premium score-preview">
                                <div className="card-top">
                                    <Trophy className="icon" size={24} />
                                    <span className="label">Fitness Score</span>
                                </div>
                                <div className="card-value" style={{ color: fitness.color }}>
                                    {fitness.score > 0 ? fitness.score : '--'}
                                </div>
                                <div className="card-footer">{fitness.status}</div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'log' && (
                        <motion.div
                            key="log"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="log-container-premium"
                        >
                            <div className="log-grid">
                                <div className="log-card glass">
                                    <h4><Scale size={20} /> Body Metrics</h4>
                                    <div className="input-group">
                                        <input type="number" value={weightInput} onChange={e => setWeightInput(e.target.value)} placeholder="Weight (kg)" />
                                        <button className="add-btn" onClick={() => handleLog('weight', weightInput, 'kg')}><PlusCircle size={20} /></button>
                                    </div>
                                    <div className="input-group">
                                        <input type="number" value={heightInput} onChange={e => setHeightInput(e.target.value)} placeholder="Height (cm)" />
                                        <button className="add-btn" onClick={() => handleLog('height', heightInput, 'cm')}><PlusCircle size={20} /></button>
                                    </div>
                                </div>

                                <div className="log-card glass">
                                    <h4><Heart size={20} /> Vital Signs</h4>
                                    <div className="dual-input">
                                        <input type="number" value={bpSysInput} onChange={e => setBpSysInput(e.target.value)} placeholder="Sys (120)" />
                                        <span>/</span>
                                        <input type="number" value={bpDiaInput} onChange={e => setBpDiaInput(e.target.value)} placeholder="Dia (80)" />
                                        <button className="add-btn" onClick={() => {
                                            handleLog('blood_pressure_sys', bpSysInput, 'mmHg');
                                            handleLog('blood_pressure_dia', bpDiaInput, 'mmHg');
                                        }}><PlusCircle size={20} /></button>
                                    </div>
                                    <div className="input-group mt-4">
                                        <input type="number" value={sleepInput} onChange={e => setSleepInput(e.target.value)} placeholder="Sleep hours" />
                                        <button className="add-btn" onClick={() => handleLog('sleep', sleepInput, 'hrs')}><PlusCircle size={20} /></button>
                                    </div>
                                </div>

                                <div className="log-card glass">
                                    <h4><Activity size={20} /> Daily Activity</h4>
                                    <div className="input-group">
                                        <input type="number" value={stepsInput} onChange={e => setStepsInput(e.target.value)} placeholder="Today's Steps" />
                                        <button className="add-btn" onClick={() => handleLog('steps', stepsInput, 'steps')}><PlusCircle size={20} /></button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'calculator' && (
                        <motion.div
                            key="calculator"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="calculator-section-premium"
                        >
                            {!fitness.score ? (
                                <div className="data-missing-card glass">
                                    <AlertCircle size={48} color="#f59e0b" />
                                    <h3>Missing Health Data</h3>
                                    <p>Please log your Weight, Height, Sleep, and Blood Pressure to calculate your fitness score.</p>
                                    <button className="action-btn" onClick={() => setActiveTab('log')}>Log Data Now</button>
                                </div>
                            ) : (
                                <div className="score-main-card glass">
                                    <div className="score-circle-container">
                                        <svg viewBox="0 0 100 100" className="score-svg">
                                            <circle cx="50" cy="50" r="45" className="bg" />
                                            <circle cx="50" cy="50" r="45" className="progress" style={{
                                                strokeDasharray: '283',
                                                strokeDashoffset: 283 - (283 * fitness.score / 100),
                                                stroke: fitness.color
                                            }} />
                                        </svg>
                                        <div className="score-display">
                                            <span className="number" style={{ color: fitness.color }}>{fitness.score}</span>
                                            <span className="total">/100</span>
                                        </div>
                                    </div>

                                    <div className="score-details">
                                        <div className="status-badge" style={{ background: `${fitness.color}20`, color: fitness.color }}>
                                            {fitness.status}
                                        </div>
                                        <h3>Health Intelligence Summary</h3>

                                        <div className="breakdown-grid">
                                            <div className="breakdown-item">
                                                <div className="item-header">
                                                    <span>BMI Analysis</span>
                                                    <span className="points">{fitness.breakdown.bmiScore}/30</span>
                                                </div>
                                                <div className="progress-bar"><div className="fill" style={{ width: `${(fitness.breakdown.bmiScore / 30) * 100}%`, background: fitness.color }}></div></div>
                                                <small>Result: {fitness.bmi} kg/m²</small>
                                            </div>

                                            <div className="breakdown-item">
                                                <div className="item-header">
                                                    <span>Sleep Quality</span>
                                                    <span className="points">{fitness.breakdown.sleepScore}/30</span>
                                                </div>
                                                <div className="progress-bar"><div className="fill" style={{ width: `${(fitness.breakdown.sleepScore / 30) * 100}%`, background: fitness.color }}></div></div>
                                                <small>Duration: {metrics.sleep[metrics.sleep.length - 1].value} hrs</small>
                                            </div>

                                            <div className="breakdown-item">
                                                <div className="item-header">
                                                    <span>Blood Pressure</span>
                                                    <span className="points">{fitness.breakdown.bpScore}/40</span>
                                                </div>
                                                <div className="progress-bar"><div className="fill" style={{ width: `${(fitness.breakdown.bpScore / 40) * 100}%`, background: fitness.color }}></div></div>
                                                <small>Latest: {metrics.blood_pressure_sys[metrics.blood_pressure_sys.length - 1].value}/{metrics.blood_pressure_dia[metrics.blood_pressure_dia.length - 1].value}</small>
                                            </div>
                                        </div>

                                        <div className="insights-box">
                                            <h4><Info size={16} /> AI Insight</h4>
                                            <p>
                                                {fitness.score >= 85 ? "Your vitals are in the optimal range. Maintain your current routine to sustain this high performance." :
                                                    fitness.score >= 70 ? "Good overall health. Focused improvements on your weakest metric could boost your score significantly." :
                                                        "Some metrics are outside the healthy range. We recommend consulting a professional and focusing on sleep and diet."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
