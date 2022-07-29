---
layout: page
title: Research
permalink: /research/
subtitle: Research - Xingbo Fu
---

<h2>Driver Behavior Modeling with Deep Reinforcement Learning</h2>
<table style="border-width: 0; margin-bottom: 10px">
  <tr>
    <td>
      <p style="text-align: justify">We propose an actor-critic method - Attention-based Twin Delayed Deep Deterministic policy gradient (ATD3) algorithm to approximate a driver's action according to observations and measure the driver's attention allocation for consecutive time steps in car-following model. Considering reaction time, we construct the attention mechanism in the actor network to capture temporal dependencies of consecutive observations. In the critic network, we employ Twin Delayed Deep Deterministic policy gradient algorithm (TD3) to address overestimated value estimates persisting in the actor-critic algorithm.</p>
    </td>
  </tr>
  <tr>
    <td>
      <a href="paper6.pdf"><div class="paper">Paper</div></a>
      <a href="https://github.com/xbfu/ATD3"><div class="code">Code</div></a>
    </td>
  </tr>
</table>

<h2>Spatiotemporal Attention Network (STAN)</h2>
<table style="border-width: 0; margin-bottom: 10px">
  <tr>
    <td>
      <p style="text-align: justify">The spatiotemporal attention network (STAN) model captures spatial correlations among different stations and temporal dependencies of time series. The STAN model employs a multi-head self-attention mechanism to extract spatial correlations among stations and temporal dependencies are captured by the Sequence-to-Sequence (Seq2Seq) model with a global attention mechanism.</p>
    </td>
  </tr>
  <tr>
    <td>
      <a href="paper5.pdf"><div class="paper">Paper</div></a>
      <a href="STAN.pdf"><div class="slides">Slides</div></a>
      <a href="https://github.com/xbfu/Spatiotemporal-Attention-Networks"><div class="code">Code</div></a>
    </td>
  </tr>
</table>

<h2>Big Data Computing Platform for Energy Internet</h2>
<table style="border-width: 0; margin-bottom: 10px">
  <tr>
    <td>
      <p style="text-align: justify">We build a big platform with Hadoop and Spark. This platform consists of solar power, wind power, user load and smart buildings. Our platform integrates various applications such as monitoring power generation, online clustering, spatial relation analysis and historical data query.</p>
    </td>
  </tr>
  <tr>
    <td>
      <a href=""><div class="report">Report</div></a>
    </td>
  </tr>
</table>

<h2>Simulation Appraoch to Solar Irradiance Data</h2>
<table style="border-width: 0; margin-bottom: 10px">
  <tr>
    <td>
      <p style="text-align: justify">Solar energy is one of important renewable energy sources and simulation of solar irradiance can be used as input for simulation of photovoltaic generation. We proposes a simulation algorithm of multi-station solar irradiance data considering temporal correlations. All the days of the observed data are grouped to <i>k</i> clusters for each station based on their daily features of solar irradiance and the daily states constitute Markov chain of days. And state permutations of different stations are reduced before getting Markov Transition Probability Matrix (MTPM). Based on the observed data and MTPM, the simulation approach is proposed.</p>
    </td>
  </tr>
  <tr>
    <td>
      <a href="paper4.pdf"><div class="paper">Paper1</div></a>
      <a href="paper2.pdf"><div class="paper">Paper2</div></a>
      <a href="A Simulation Approach to Multi-station Solar Irradiance Data.pdf"><div class="slides">Slides</div></a>
    </td>
  </tr>
</table>