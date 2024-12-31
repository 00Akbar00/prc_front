"use client";
import React from 'react';
import Table from '../../components/hr/table/table';
import { styles } from '@/components/hr/table/tableStyle';

const HrDash = () => {
  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <h1 style={styles.tableTitle}>HR Dashboard</h1>
        <Table style={styles} />
      </div>
    </div>
  );
};

export default HrDash;
